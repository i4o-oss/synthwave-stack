import type { ReactNode } from 'react'
import type React from 'react'

export enum ButtonSize {
	LG,
	MD,
	sm,
	XS,
}

export interface ButtonProps {
	bg?: string
	children?: ReactNode | string
	className?: string
	isDisabled?: boolean
	isLoading?: boolean
	loadingText?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	padding?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	shadow?: string
	size?: ButtonSize
	textColor?: string
	type?: 'button' | 'submit' | 'reset'
}
