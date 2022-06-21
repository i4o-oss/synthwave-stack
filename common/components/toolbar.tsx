import type { FC, ReactNode } from 'react'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'

export const ToolbarRoot = ToolbarPrimitive.Root
export const ToolbarButton = ToolbarPrimitive.Button
export const ToolbarLink = ToolbarPrimitive.Link
export const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup
export const ToolbarToggleItem = ToolbarPrimitive.ToggleItem

interface ToolbarProps {
	ariaLabel: string
	children: ReactNode
	className?: string
}

const Toolbar: FC<ToolbarProps> = ({ ariaLabel, children, className }) => {
	return (
		<ToolbarRoot aria-label={ariaLabel} className={className}>
			{children}
		</ToolbarRoot>
	)
}

export default Toolbar
