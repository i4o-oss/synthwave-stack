import React, { useMemo } from 'react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetchers,
	useTransition,
} from '@remix-run/react'
import { useEffect } from 'react'
// @ts-ignore
import NProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import styles from './styles/app.css'
import cuiStyles from '@i4o-oss/catalystui/main.css'

interface DocumentProps {
	children: React.ReactNode
}

export const links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Orbitron:wght@700&display=swap',
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'stylesheet', href: nProgressStyles },
	]
}

export const meta: MetaFunction = () => ({
	// TODO: Fill out the empty strings as required
	charset: 'utf-8',
	'msapplication-TileColor': '#2b5797',
	'og:site': '',
	'og:url': 'https://stack.i4o.dev',
	'og:title': 'Synthwave Stack',
	'og:description':
		'A custom Remix stack for building web apps using React, Tailwind, and TypeScript.',
	'og:image': '',
	'theme-color': '',
	title: '',
	'twitter:card': 'summary_large_image',
	'twitter:site': '',
	'twitter:url': 'https://stack.i4o.dev',
	'twitter:creator': 'Ilango Rajagopal',
	'twitter:title': 'Synthwave Stack',
	'twitter:description':
		'A custom Remix stack for building web apps using React, Tailwind, and TypeScript.',
	'twitter:image': '',
	viewport: 'width=device-width,initial-scale=1',
})

const Document = (props: DocumentProps) => {
	const transition = useTransition()
	const fetchers = useFetchers()

	/**
	 * This gets the state of every fetcher active on the app and combine it with
	 * the state of the global transition (Link and Form), then use them to
	 * determine if the app is idle or if it's loading.
	 * Here we consider both loading and submitting as loading.
	 */
	let state = useMemo<'idle' | 'loading'>(
		function getGlobalState() {
			let states = [
				transition.state,
				...fetchers.map((fetcher) => fetcher.state),
			]
			if (states.every((state) => state === 'idle')) return 'idle'
			return 'loading'
		},
		[transition.state, fetchers]
	)

	useEffect(() => {
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location, so we start it
		if (state === 'loading') NProgress.start()
		// when the state is idle then we can to complete the progress bar
		if (state === 'idle') NProgress.done()
	}, [transition.state, state])

	return (
		<html lang='en' className='h-full'>
			<head>
				<Meta />
				<Links />
				<title>Synthwave Stack</title>
			</head>
			<body className='h-full w-full bg-brand-900 font-sans'>
				{process.env.NODE_ENV === 'production' ? (
					<>
						{/*
							TODO: fill data-code
							// get data-code by visiting dashboard.pirsch.io and clicking on the website you want to track
						*/}
						<script
							defer
							type='text/javascript'
							src='https://api.pirsch.io/pirsch.js'
							id='pirschjs'
							data-code=''
						></script>
					</>
				) : null}
				{props.children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}
