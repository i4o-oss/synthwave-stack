import React, { useEffect, useMemo } from 'react'
import type { LinksFunction, LoaderArgs, SerializeFrom, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetchers,
    useLoaderData,
    useNavigation,
} from '@remix-run/react'
// @ts-ignore
import NProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import { getThemeSession } from './lib/theme.server'
import { ThemeHead, ThemeProvider, useTheme } from './lib/theme'
import styles from '~/main.css'
import cuiStyles from '@i4o/catalystui/main.css'

interface DocumentProps {
	children: React.ReactNode
}

export const links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Orbitron:wght@700&display=swap',
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'stylesheet', href: nProgressStyles },
		{ rel: 'stylesheet', href: cuiStyles },
	]
}

// TODO: fill out the empty strings as required
export const meta: V2_MetaFunction = () => [
    {
        charSet: 'utf-8',
    },
    {
        property: 'og:site',
        content: '',
    },
    {
        property: 'og:url',
        content: '',
    },
    {
        property: 'og:title',
        content: '',
    },
    {
        property: 'og:description',
        content:
            '',
    },
    {
        property: 'og:image',
        content: '',
    },
    {
        title: 'Synthwave Stack',
    },
    {
        name: 'description',
        content:
            '',
    },
    {
        name: 'twitter:card',
        content: 'summary_large_image',
    },
    {
        name: 'twitter:site',
        content: '',
    },
    {
        name: 'twitter:url',
        content: '',
    },
    {
        name: 'twitter:creator',
        content: '@i4o_dev',
    },
    {
        name: 'twitter:title',
        content: 'Synthwave Stack',
    },
    {
        name: 'twitter:description',
        content:
            '',
    },
    {
        name: 'twitter:image',
        content: '',
    },
    {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1',
    },
]

export type LoaderData = SerializeFrom<typeof loader>

export const loader = async ({ request }: LoaderArgs) => {
	const themeSession = await getThemeSession(request)

	return json({
		theme: themeSession.getTheme(),
	})
}

const Document = ({ children }: DocumentProps) => {
	const data = useLoaderData<LoaderData>()
	const [theme] = useTheme()
	const navigation = useNavigation()
	const fetchers = useFetchers()

	/**
	 * This gets the state of every fetcher active on the app and combine it with
	 * the state of the global transition (Link and Form), then use them to
	 * determine if the app is idle or if it's loading.
	 * Here we consider both loading and submitting as loading.
	 */
	let state = useMemo<'idle' | 'loading'>(
		function getGlobalState() {
			let states = [
				navigation.state,
				...fetchers
					.filter(
						// use navigation.state only for page navigation.
						// any navigation with formAction that starts with "/api" should be ignored
						// this is done so any api call does not trigger nprogress and should only appear for page navigation
						(fetcher) => !fetcher.formAction?.startsWith('/api')
					)
					.map((fetcher) => fetcher.state),
			]
			if (states.every((state) => state === 'idle')) return 'idle'
			return 'loading'
		},
		[navigation.state, fetchers]
	)

	useEffect(() => {
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location, so we start it
		if (state === 'loading') NProgress.start()
		// when the state is idle then we can to complete the progress bar
		if (state === 'idle') NProgress.done()
	}, [navigation.state, state])

	return (
		<html
			lang='en'
			className={`h-screen w-screen ${
				theme ?? ''
			} cui-${theme} au-${theme}`}
		>
			<head>
				<Meta />
				<Links />
				<ThemeHead ssrTheme={Boolean(data.theme)} />
			</head>
			<body className='bg-primary h-full w-full font-sans'>
				{process.env.NODE_ENV !== 'development' ? (
					<script
						async
						src='https://analytics.i4o.dev/script.js'
						data-website-id='7621579d-ef19-4240-bef7-51e71ee9fa96'
					></script>
				) : (
					<script
						async
						src='https://analytics.i4o.dev/script.js'
						data-website-id='efb3fedc-7312-4e9f-bb7d-7a2085019dd1'
					></script>
				)}
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	)
}

function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export default function AppWithProviders() {
	const data = useLoaderData<LoaderData>()

	return (
		<ThemeProvider specifiedTheme={data.theme}>
			<App />
		</ThemeProvider>
	)
}
