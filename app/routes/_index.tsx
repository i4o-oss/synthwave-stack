import { Link } from '@remix-run/react'
import {
	CheckCircledIcon,
	DashboardIcon,
	FileTextIcon,
	GitHubLogoIcon,
	HeartFilledIcon,
	LayersIcon,
	LockClosedIcon,
	MixIcon,
	RocketIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { CopyToClipboard, Switch } from '@i4o/catalystui'
import { Theme, useTheme } from '~/lib/theme'
import { json } from '@remix-run/node'

export async function loader() {
	const res = await fetch(
		'https://api.github.com/repos/i4o-oss/synthwave-stack'
	)
	const data = await res.json()
	return json({ stars: data.stargazers_count })
}

const FEATURES = [
	{
		name: 'Easy to use',
		description:
			"Fill in some environment variables, and you're off to shipping in minutes",
		icon: RocketIcon,
	},
	{
		name: 'Built for Remix',
		description:
			"Leverage Remix's features to build modern web apps with great UX",
		icon: HeartFilledIcon,
	},
	{
		name: 'Authentication',
		description: 'Magic links and Google & Twitter oAuth out-of-the-box',
		icon: LockClosedIcon,
	},
	{
		name: 'Written In TypeScript',
		description: 'Build your app with typesafety from the very start',
		icon: CheckCircledIcon,
	},
	{
		name: 'Third-party Integrations',
		description: 'Pre-configured emails, analytics, error tracking',
		icon: MixIcon,
	},
	{
		name: 'Components',
		description: 'UI components built using Radix UI and TailwindCSS',
		icon: LayersIcon,
	},
	{
		name: 'Docs (Coming Soon)',
		description: 'Full-featured documentation site with MDX',
		icon: FileTextIcon,
	},
	{
		name: 'Payments (Coming Soon)',
		description: 'Billing and subscriptions using LemonSqueezy',
		icon: DashboardIcon,
	},
]

const SOCIALS = [
	{
		ariaLabel: 'Github Repository',
		icon: <GitHubLogoIcon className='h-6 w-6' />,
		href: 'https://github.com/i4o-oss/synthwave-stack',
	},
]

const FOOTER_SOCIALS = [
	{
		ariaLabel: 'Github Repository',
		icon: <GitHubLogoIcon className='h-6 w-6' />,
		href: 'https://github.com/i4o-oss/synthwave-stack',
	},
	{
		ariaLabel: 'Twitter Profile',
		icon: <TwitterLogoIcon className='h-6 w-6' />,
		href: 'https://twitter.com/i4o_dev',
	},
]

function DarkModeToggle() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	return (
		<Switch
			defaultChecked={theme === Theme.DARK}
			name='theme-switcher'
			onCheckedChange={toggleTheme}
		/>
	)
}

function Navbar() {
	return (
		<header className='supports-backdrop-blur:bg-white/60 sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-between px-4 py-4 shadow-sm shadow-gray-200 backdrop-blur dark:bg-transparent dark:shadow-gray-700 sm:px-6 lg:px-8'>
			<div className='relative flex flex-grow basis-0 items-center'>
				<Link aria-label='Home page' to='/'>
					<img
						className='flex h-8'
						src='https://raw.githubusercontent.com/i4o-oss/rescribe/main/docs/public/rescribe_logo.png'
						alt='logo'
					/>
				</Link>
			</div>
			<div className='flex flex-grow items-center justify-end gap-4'>
				{SOCIALS.map((social, index) => (
					<a
						aria-label={social.ariaLabel}
						className='text-black dark:text-gray-100'
						href={social.href}
						key={`social-${index}`}
						rel='noreferrer noopener'
						target='_blank'
					>
						{social.icon}
					</a>
				))}
				<DarkModeToggle />
			</div>
		</header>
	)
}

function Hero() {
	return (
		<div className='isolate w-full'>
			<div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
				<svg
					className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
					viewBox='0 0 1155 678'
				>
					<path
						fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
						fillOpacity='.3'
						d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
					/>
					<defs>
						<linearGradient
							id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
							x1='1155.49'
							x2='-78.208'
							y1='.177'
							y2='474.645'
							gradientUnits='userSpaceOnUse'
						>
							<stop stopColor='#124A33' />
							<stop offset={1} stopColor='#2cb67d' />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<main className='w-full'>
				<div className='relative mx-auto flex w-full max-w-5xl justify-center px-6 lg:px-8'>
					<div className='w-full max-w-3xl py-20 sm:py-32 lg:py-40'>
						<div className='text-center'>
							<h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-tight'>
								Ship modern web apps fast
							</h1>
							<p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
								Powered by Remix, this stack saves you tons of
								time and effort with pre-configured libraries
								and tools that developers love
							</p>
							<div className='mt-10 flex items-center justify-center gap-x-6'>
								<pre className='flex h-12 w-auto items-center justify-between space-x-2 rounded-lg border border-slate-100 bg-white !pl-4 !pr-2 dark:border-slate-700 dark:bg-[#040303]'>
									<code className='flex w-full items-center justify-between font-mono text-sm font-semibold text-slate-900 dark:text-slate-50 gap-x-4'>
										pnpm create remix@latest --template
										i4o-oss/synthwave-stack
										<CopyToClipboard text='pnpm create remix@latest --template i4o-oss/synthwave-stack' />
									</code>
								</pre>
							</div>
						</div>
					</div>
					<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
						<svg
							className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
							viewBox='0 0 1155 678'
						>
							<path
								fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
								fillOpacity='.3'
								d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
							/>
							<defs>
								<linearGradient
									id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
									x1='1155.49'
									x2='-78.208'
									y1='.177'
									y2='474.645'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#124A33' />
									<stop offset={1} stopColor='#2cb67d' />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
			</main>
		</div>
	)
}

function TechStack() {
	const [theme] = useTheme()

	return (
		<div className='py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<h2 className='text-center text-base font-semibold leading-8 text-gray-600 dark:text-gray-300'>
					Technologies loved by developers
				</h2>
				<div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src={
							theme === Theme.DARK
								? '/images/remix_dark.png'
								: '/images/remix_light.png'
						}
						alt='Remix'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src='https://devicons.railway.app/i/react.svg'
						alt='React'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src='/images/ts.png'
						alt='TypeScript'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src={
							theme === Theme.DARK
								? 'https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-LightSymbol.png'
								: 'https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-DarkSymbol.png'
						}
						alt='Prisma'
						width={48}
						height={48}
					/>
					<div className='max-h-12 col-span-2 sm:col-start-2 lg:col-span-1 flex justify-center'>
						<img
							className='h-full object-contain rounded-md overflow-hidden'
							src='/images/pscale.png'
							alt='PlanetScale'
							width={48}
							height={48}
						/>
					</div>
					<img
						className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
						src='https://raw.githubusercontent.com/tailwindlabs/tailwindcss.com/master/public/favicons/android-chrome-256x256.png'
						alt='TailwindCSS'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src={
							theme === Theme.DARK
								? '/images/sentry_dark.png'
								: '/images/sentry_light.png'
						}
						alt='Sentry'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-8 w-full object-contain lg:col-span-1'
						src={
							theme === Theme.DARK
								? '/images/resend_dark.png'
								: '/images/resend_light.png'
						}
						alt='Resend'
						width={158}
						height={40}
					/>
					<img
						className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
						src='/images/amplitude.png'
						alt='Amplitude'
						width={48}
						height={48}
					/>
					<img
						className='col-span-2 max-h-10 w-full object-contain lg:col-span-1'
						src={
							theme === Theme.DARK
								? 'https://devicons.railway.app/i/railway-light.svg'
								: 'https://devicons.railway.app/i/railway-dark.svg'
						}
						alt='Railway'
						width={48}
						height={48}
					/>
				</div>
			</div>
		</div>
	)
}

function Features() {
	return (
		<div className='py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl lg:text-center'>
					<h2 className='text-brand text-base font-semibold leading-7'>
						Build apps faster
					</h2>
					<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-tight'>
						Everything you need to build Remix-powered web apps
					</p>
				</div>
				<div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl'>
					<dl className='grid max-w-xl grid-cols-2 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
						{FEATURES.map((feature) => (
							<div key={feature.name} className='relative pl-16'>
								<dt className='text-base font-semibold leading-7 text-gray-900 dark:text-gray-100'>
									<div className='bg-brand absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg'>
										<feature.icon
											className='h-5 w-5 text-white'
											aria-hidden='true'
										/>
									</div>
									{feature.name}
								</dt>
								<dd className='mt-2 text-base leading-7 text-gray-600 dark:text-gray-300'>
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}

function CTA() {
	return (
		<div className='py-24 sm:py-32'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='relative isolate overflow-hidden bg-brand bg-blend-darken px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
					<div className='mx-auto flex flex-col items-center text-center lg:mx-0 lg:flex-auto lg:py-32'>
						<h2 className='text-3xl font-bold sm:text-4xl text-primary-foreground'>
							Start a project with Synthwave Stack today.
						</h2>
						<p className='max-w-2xl mt-6 text-lg leading-8 text-primary-foreground'>
							Synthwave Stack is open source and powered by open
							source software.
							<br />
							The code is available on{' '}
							<a
								className='text-base font-semibold leading-6 text-primary-foreground underline'
								href='https://github.com/i4o-oss/synthwave-stack'
								rel='noopener noreferrer'
								target='_blank'
							>
								Github
							</a>
							.
						</p>
						<div className='mt-10 flex flex-col items-center justify-center gap-8'>
							<a
								href='https://github.com/i4o-oss/synthwave-stack'
								className='text-lg font-semibold leading-6 text-primary-foreground flex items-center gap-x-1'
								target='_blank'
								rel='noopener noreferrer'
							>
								<div className='w-10 h-10 flex items-center justify-center bg-ui text-primary-foreground rounded'>
									<GitHubLogoIcon className='w-5 h-5' />
								</div>
								<div className='flex items-center'>
									<div className='h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-ui border-y-transparent'></div>
									<div className='flex h-10 items-center rounded-md border border-ui bg-ui px-4 font-medium'>
										72 stars on GitHub
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function Footer() {
	return (
		<div className='sticky top-0 z-50 flex h-20 w-screen flex-wrap items-center justify-center border-t border-gray-200 py-4 dark:border-gray-700'>
			<div className='flex w-[88rem] items-center justify-between sm:px-2 lg:px-8 xl:px-12'>
				<div className='flex items-center gap-2 text-gray-900 dark:text-gray-400'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='m7 11 2-2-2-2'></path>
						<path d='M11 13h4'></path>
						<rect
							x='3'
							y='3'
							width='18'
							height='18'
							rx='2'
							ry='2'
						></rect>
					</svg>
					<p>
						Built by{' '}
						<a
							className='underline'
							href='https://i4o.dev'
							target='_blank'
							rel='noreferrer noopener'
						>
							i4o
						</a>
						.
					</p>
				</div>
				<div className='flex items-center justify-end gap-4'>
					{FOOTER_SOCIALS.map((social, index) => (
						<a
							aria-label={social.ariaLabel}
							className='text-black dark:text-gray-100'
							href={social.href}
							key={`social-${index}`}
							rel='noreferrer noopener'
							target='_blank'
						>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default function Index() {
	return (
		<>
			<Navbar />
			<div className='flex min-h-[calc(100vh-10rem)] w-full flex-col'>
				<Hero />
				<TechStack />
				<Features />
				<CTA />
			</div>
			<Footer />
		</>
	)
}
