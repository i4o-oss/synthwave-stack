import { createCookieSessionStorage } from '@remix-run/node'

// @ts-ignore
const session_secret: string = process.env.SESSION_SECRET

export let sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__aurelius_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [session_secret],
		secure: process.env.NODE_ENV === 'production',
	},
})

export let { getSession, commitSession, destroySession } = sessionStorage
