import type { FC, ReactNode } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export const ToastProvider = ToastPrimitive.ToastProvider
export const ToastRoot = ToastPrimitive.Root
export const ToastTitle = ToastPrimitive.Title
export const ToastDescription = ToastPrimitive.Description
export const ToastAction = ToastPrimitive.Action
export const ToastViewport = ToastPrimitive.Viewport

type ToastProps = {
	open: boolean
	setOpen: () => void
	title?: string
	description?: string
	action?: ReactNode
	actionAltText?: string
}

const Toast: FC<ToastProps> = ({
	open,
	setOpen,
	title,
	description,
	action,
	actionAltText,
}) => {
	return (
		<ToastProvider swipeDirection='right'>
			<ToastRoot open={open} onOpenChange={setOpen}>
				<ToastTitle>{title}</ToastTitle>
				<ToastDescription asChild>{description}</ToastDescription>
				<ToastAction asChild altText={actionAltText as string}>
					{action}
				</ToastAction>
			</ToastRoot>
			<ToastViewport />
		</ToastProvider>
	)
}
