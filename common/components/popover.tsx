import type { FC, ReactNode } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = PopoverPrimitive.Content
const PopoverArrow = PopoverPrimitive.Arrow
const PopoverClose = PopoverPrimitive.Close

interface PopoverProps {
	arrowClassName?: string | undefined
	close?: ReactNode | undefined
	children: string | ReactNode
	contentClassName?: string
	trigger: ReactNode
}

const Popover: FC<PopoverProps> = ({
	arrowClassName,
	close,
	children,
	contentClassName,
	trigger,
}) => {
	return (
		<PopoverRoot>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className={contentClassName}>
				{children}
				<PopoverArrow className={arrowClassName} />
				{close && <PopoverClose>{close}</PopoverClose>}
			</PopoverContent>
		</PopoverRoot>
	)
}

export default Popover
