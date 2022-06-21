import type { FC, ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenuRoot = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = DropdownMenuPrimitive.Content
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

interface DropdownMenuProps {
	align?: 'end' | 'start' | 'center' | undefined
	arrowClassName?: string | undefined
	children: ReactNode
	contentClassName?: string
	rootClassName?: string
	side?: 'top' | 'right' | 'bottom' | 'left'
	sideOffset?: number
	trigger: ReactNode
}

const DropdownMenu: FC<DropdownMenuProps> = ({
	align = 'end',
	arrowClassName,
	children,
	contentClassName,
	rootClassName = '',
	side = 'bottom',
	sideOffset,
	trigger,
}) => {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent
				align={align}
				className={contentClassName}
				side={side}
				sideOffset={sideOffset}
			>
				{children}
				<DropdownMenuArrow className={arrowClassName} offset={14} />
			</DropdownMenuContent>
		</DropdownMenuRoot>
	)
}

export default DropdownMenu
