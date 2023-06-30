import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { auth } from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'

export let loader: LoaderFunction = async ({ request }) => {
	await auth.isAuthenticated(request, { successRedirect: '/app' })
	let session = await sessionStorage.getSession(request.headers.get('Cookie'))
	// This session key `auth:magiclink` is the default one used by the EmailLinkStrategy
	// you can customize it passing a `sessionMagicLinkKey` when creating an
	// instance.
	if (session.has('auth:magiclink')) return json({ magicLinkSent: true })

	return json({ magicLinkSent: false })
}

export let action: ActionFunction = async ({ request }) => {
	await auth.authenticate('email-link', request, {
		successRedirect: '/login',
		failureRedirect: '/login',
	})
}

export default function () {
	let { magicLinkSent } = useLoaderData<{ magicLinkSent: boolean }>()

	return (
		<main className='flex flex-col items-center justify-between p-24 min-h-screen'>
			<Form action='/login' method='post'>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-8 flex flex-col items-center justify-center space-y-8'>
						<img
							className='w-48'
							src='/images/logoipsum.svg'
							alt='Logo'
						/>
						<div className='flex flex-col items-center justify-center space-y-4'>
							<h1 className='text-3xl font-bold'>Sign In</h1>
							<p className='text-lg font-semibold'>
								Sign in with an existing account or create a new
								account.
							</p>
						</div>
					</div>
					<div className='flex w-96 flex-col items-center justify-center space-y-4'>
						<div className='w-full space-y-2'>
							<label htmlFor='email'>Email address</label>
							<input
								className='h-12 w-full rounded-md border border-gray-300 bg-transparent p-4 text-white outline-none focus:border-gray-300 focus:bg-transparent active:border-gray-300 active:bg-transparent'
								id='email'
								type='email'
								name='email'
								required
							/>
						</div>
						<button className='flex h-12 w-full items-center justify-center rounded-md bg-brand-500'>
							Sign In
						</button>
					</div>
					{magicLinkSent && (
						<div className='my-4 w-96 text-center'>
							<p>
								A sign in link has been sent to your email
								address.
							</p>
						</div>
					)}
				</div>
			</Form>
			<div className='before:relative before:w-1/2 before:border-t before:border-gray-300 before:content-[""] after:relative after:w-1/2 after:border-t after:border-gray-300 after:content-[""]'>
				<span className='mx-4 text-lg'>or</span>
			</div>
			<Form action='/auth/google' method='post'>
				<div className='flex w-96 flex-col items-center justify-center space-y-4'>
					<button className='flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-gray-800'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='1em'
							viewBox='0 0 488 512'
						>
							<path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
						</svg>
						<span>Sign In with Google</span>
					</button>
				</div>
			</Form>
			<Form action='/auth/twitter' method='post'>
				<div className='flex w-96 flex-col items-center justify-center space-y-4'>
					<button className='flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-gray-800'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='1em'
							viewBox='0 0 512 512'
						>
							<path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' />
						</svg>
						<span>Sign In with Twitter</span>
					</button>
				</div>
			</Form>
		</main>
	)
}
