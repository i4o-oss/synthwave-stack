import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { auth } from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'
import { Container } from '~/routes/index'
import { FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

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
		<Container>
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
						<FcGoogle />
						<span>Sign In with Google</span>
					</button>
				</div>
			</Form>
			<Form action='/auth/twitter' method='post'>
				<div className='flex w-96 flex-col items-center justify-center space-y-4'>
					<button className='flex h-12 w-full items-center justify-center space-x-2 rounded-md bg-gray-800'>
						<FaTwitter className='text-[#1D9BF0]' />
						<span>Sign In with Twitter</span>
					</button>
				</div>
			</Form>
		</Container>
	)
}
