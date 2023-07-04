import type { LoaderFunction } from '@remix-run/node'
import { auth } from '~/services/google-auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	await auth.authenticate('google', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}
