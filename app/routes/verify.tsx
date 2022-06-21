import type { LoaderFunction } from '@remix-run/node'
import { auth } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	await auth.authenticate('email-link', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}
