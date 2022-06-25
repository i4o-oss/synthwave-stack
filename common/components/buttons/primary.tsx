import type { FC } from 'react'
import type { ButtonProps } from './types'
import Button from './button'

interface PrimaryButtonProps extends ButtonProps {
	bg?: string
	shadow?: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
	bg = 'bg-brand-500',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	shadow = 'shadow-md',
	textColor = 'text-white',
	type = 'button',
}) => {
	return (
		<Button
			bg={bg}
			className={`${className} ${shadow}`}
			isDisabled={isDisabled}
			isLoading={isLoading}
			loadingText={loadingText}
			onClick={onClick}
			textColor={textColor}
			type={type}
		>
			{children}
		</Button>
	)
}

export default PrimaryButton
