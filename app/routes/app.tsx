import { Outlet, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import type { User } from '~/models/user.server'
import { auth } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function App() {
	const { user } = useLoaderData<{ user: User }>()

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Outlet />
		</main>
	)
}
