import { ExternalLink } from 'react-feather'

export default function Index() {
	return (
		<main className='flex flex-col items-center justify-between p-24 min-h-screen'>
			<div className='flex w-full container items-center justify-between'>
				<p className='text-center text-sm leading-8 text-white bg-brand-900 border border-gray-800 px-4 py-2 rounded-lg'>
					Get started by editing{' '}
					<code className='text-brand-500'>app/routes/index.tsx</code>
				</p>
				<div className='flex items-center text-gray-200 space-x-2 border border-gray-800 px-4 py-2 rounded-lg text-sm'>
					Stack by&nbsp;
					<a
						className='flex items-center space-x-2 text-brand-500'
						href='https://i4o.dev'
					>
						<p className='text-center text-md leading-8'>i4o.dev</p>
						<ExternalLink className='w-4 h-4' />
					</a>
				</div>
			</div>
			<div className='w-full container flex items-center justify-center space-x-4 font-["Orbitron"] text-8xl text-white'>
				Synthwave Stack
			</div>
			<div className='grid grid-cols-2 w-full container gap-4'>
				<a
					href='https://github.com/i4o-oss/synthwave-stack'
					className='px-4 py-6 rounded-lg border border-gray-800 bg-brand-900'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className='text-gray-200'>
						Docs <span>-&gt;</span>
					</h2>
					<p className='text-gray-200'>
						Find in-depth information about Synthwave Stack's
						features.
					</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					className='px-4 py-6 rounded-lg border border-gray-800 bg-brand-900'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className='text-gray-200'>
						Checkout Remix <span>-&gt;</span>
					</h2>
					<p className='text-gray-200'>
						Learn more about the Remix framework.
					</p>
				</a>
			</div>
		</main>
	)
}
