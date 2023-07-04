import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { auth } from '~/services/twitter-auth.server'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request }) => {
	return auth.authenticate('twitter', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}
