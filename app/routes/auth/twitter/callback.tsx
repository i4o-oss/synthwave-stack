import type { LoaderFunction } from '@remix-run/node'
import { auth } from '~/services/twitter-auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	await auth.authenticate('twitter', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}
