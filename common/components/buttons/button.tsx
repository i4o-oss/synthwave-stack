import type { FC } from 'react'
import type { ButtonProps } from './types'

const Button: FC<ButtonProps> = ({
	bg = 'bg-gray-700',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	padding = 'px-4 py-1',
	shadow = '',
	textColor = 'text-gray-200',
	type = 'button',
}) => {
	return (
		<button
			className={`focus-visible:ring-blend-darken inline-flex items-center justify-center rounded-md border border-transparent text-sm font-semibold hover:bg-blend-darken focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className} ${bg} ${padding} ${shadow} ${textColor}`}
			disabled={isDisabled}
			onClick={onClick}
			type={type}
		>
			{isLoading && (
				<svg
					className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					/>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					/>
				</svg>
			)}
			{isLoading ? loadingText : children}
		</button>
	)
}

export default Button
