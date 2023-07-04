import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useFetcher } from '@remix-run/react'

enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
}

const themes: Array<Theme> = Object.values(Theme)

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const prefersDarkMQ = '(prefers-color-scheme: dark)'
const getPreferredTheme = () =>
	window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT

function ThemeProvider({
	children,
	specifiedTheme,
}: {
	children: ReactNode
	specifiedTheme: Theme | null
}) {
	const [theme, setTheme] = useState<Theme | null>(() => {
		// On the server, if we don't have a specified theme then we should
		// return null and the clientThemeCode will set the theme for us
		// before hydration. Then (during hydration), this code will get the same
		// value that clientThemeCode got so hydration is happy.
		if (specifiedTheme) {
			if (themes.includes(specifiedTheme)) {
				return specifiedTheme
			} else {
				return null
			}
		}
		// there's no way for us to know what the theme should be in this context
		// the client will have to figure it out before hydration.
		if (typeof window !== 'object') {
			return null
		}

		return getPreferredTheme()
	})

	const persistTheme = useFetcher()

	// TODO: remove this when persistTheme is memoized properly
	const persistThemeRef = useRef(persistTheme)
	useEffect(() => {
		persistThemeRef.current = persistTheme
	}, [persistTheme])

	const mountRun = useRef(false)

	useEffect(() => {
		if (!mountRun.current) {
			mountRun.current = true
			return
		}
		if (!theme) {
			return
		}

		persistThemeRef.current.submit(
			{ theme },
			{ action: 'action/theme', method: 'post' }
		)
	}, [theme])

	useEffect(() => {
		const mediaQuery = window.matchMedia(prefersDarkMQ)
		const handleChange = () => {
			setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
		}
		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			{children}
		</ThemeContext.Provider>
	)
}

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let Matt know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let me know you're seeing this message? Thanks!",
    );
  }
})();
`

function ThemeHead({ ssrTheme }: { ssrTheme: boolean }) {
	const [theme] = useTheme()
	// It should be double curly brackets but for some reason
	// // my markdown doesn't like it ¯\_(ツ)_/¯
	return (
		<>
			{/*
                On the server, "theme" might be `null`, so clientThemeCode ensures that
                this is correct before hydration.
            */}
			<meta
				name='color-scheme'
				content={theme === 'light' ? 'light dark' : 'dark light'}
			/>
			{/*
                If we know what the theme is from the server then we don't need
                to do fancy tricks prior to hydration to make things match.
            */}
			{ssrTheme ? null : (
				<script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
			)}
		</>
	)
}

function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

function isTheme(value: unknown): value is Theme {
	return typeof value === 'string' && themes.includes(value as Theme)
}

export { isTheme, Theme, ThemeHead, ThemeProvider, useTheme }
