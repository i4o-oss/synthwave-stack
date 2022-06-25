import type { FC, ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import cx from 'classnames'

export const DropdownMenuRoot = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = DropdownMenuPrimitive.Content
export const DropdownMenuItem = DropdownMenuPrimitive.Item

interface DropdownMenuItemType {
	icon?: ReactNode
	label: string | ReactNode
	onSelect?: (e: Event) => void
	shortcut?: string
}

interface DropdownMenuProps {
	align?: 'end' | 'start' | 'center' | undefined
	items: DropdownMenuItemType[]
	sideOffset?: number
	trigger: ReactNode
}

const DropdownMenu: FC<DropdownMenuProps> = ({
	align = 'end',
	items,
	sideOffset = 5,
	trigger,
}) => {
	return (
		<div className='relative inline-block text-left'>
			<DropdownMenuRoot>
				<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
				<DropdownMenuContent
					align={align}
					className={cx(
						' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
						'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
						'bg-white dark:bg-gray-800'
					)}
					sideOffset={sideOffset}
				>
					{items.map(({ label, icon, onSelect, shortcut }, i) => (
						<DropdownMenuItem
							key={`${label}-${i}`}
							className={cx(
								'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
								'text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900'
							)}
							onSelect={(e) => onSelect?.(e)}
						>
							{icon}
							<span className='flex-grow text-gray-700 dark:text-gray-300'>
								{label}
							</span>
							{shortcut && (
								<span className='text-xs'>{shortcut}</span>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenuRoot>
		</div>
	)
}

export default DropdownMenu
