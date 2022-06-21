import type { ActionFunction } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { auth as googleAuth } from '~/services/google-auth.server'
import { auth as twitterAuth } from '~/services/twitter-auth.server'

export let action: ActionFunction = async ({ request }) => {
	await auth.logout(request, { redirectTo: '/app' })
	await googleAuth.logout(request, { redirectTo: '/app' })
	await twitterAuth.logout(request, { redirectTo: '/app' })
}
