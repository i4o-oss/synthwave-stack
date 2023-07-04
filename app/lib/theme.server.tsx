import { createCookieSessionStorage } from '@remix-run/node'

import { isTheme, Theme } from './theme'

const sessionSecret = process.env.SESSION_SECRET || 'I4O_DEV_SESSION_SECRET'
if (!sessionSecret) {
	throw new Error('SESSION_SECRET must be set')
}

const themeStorage = createCookieSessionStorage({
	cookie: {
        // TODO: change cookie name
		name: '__synthwave_stack_theme',
		secure: true,
		secrets: [sessionSecret],
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
	},
})

async function getThemeSession(request: Request) {
	const session = await themeStorage.getSession(request.headers.get('Cookie'))
	return {
		getTheme: () => {
			const themeValue = session.get('theme')
			return isTheme(themeValue) ? themeValue : Theme.DARK
		},
		setTheme: (theme: Theme) => session.set('theme', theme),
		commit: () => themeStorage.commitSession(session),
	}
}

export { getThemeSession }
