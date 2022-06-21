import React from 'react'
import type { FC, ReactNode } from 'react'
import type { ButtonProps } from './types'

interface IconButtonProps extends ButtonProps {
	icon: ReactNode
}

const IconButton: FC<IconButtonProps> = ({
	bg = 'bg-transparent',
	className,
	icon,
	onClick,
	padding = 'p-4',
	shadow = '',
	textColor = 'text-white',
}) => {
	return (
		<button
			className={`focus-visible:ring-blend-darken inline-flex justify-center rounded-md border border-transparent text-sm font-semibold hover:bg-blend-darken focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className} ${bg} ${padding} ${shadow} ${textColor}`}
			onClick={onClick}
		>
			{icon}
		</button>
	)
}

export default IconButton
