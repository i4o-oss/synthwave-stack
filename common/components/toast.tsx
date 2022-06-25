import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import cx from 'classnames'

export const ToastProvider = ToastPrimitive.ToastProvider
export const ToastRoot = ToastPrimitive.Root
export const ToastTitle = ToastPrimitive.Title
export const ToastDescription = ToastPrimitive.Description
export const ToastAction = ToastPrimitive.Action
export const ToastViewport = ToastPrimitive.Viewport

type ToastProps = {
	title?: string
	description?: string
	action?: ReactNode
	actionAltText?: string
	trigger: ReactNode
}

const Toast: FC<ToastProps> = ({
	title,
	description,
	action,
	actionAltText,
	trigger,
}) => {
	const [open, setOpen] = useState(false)

	return (
		<ToastProvider swipeDirection='right'>
			{trigger}
			<ToastRoot
				className={cx(
					'fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm',
					'bg-white dark:bg-gray-800',
					'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
					'radix-state-closed:animate-toast-hide',
					'radix-swipe-end:animate-toast-swipe-out',
					'translate-x-radix-toast-swipe-move-x',
					'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
					'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
				)}
				open={open}
				onOpenChange={setOpen}
			>
				<div className='flex'>
					<div className='flex w-0 flex-1 items-center py-4 pl-5'>
						<div className='radix w-full'>
							<ToastTitle className='text-sm font-medium text-gray-900 dark:text-gray-100'>
								{title}
							</ToastTitle>
							<ToastDescription
								asChild
								className='mt-1 text-sm text-gray-700 dark:text-gray-400'
							>
								{description}
							</ToastDescription>
						</div>
					</div>
				</div>
				{action && (
					<div className='flex'>
						<div className='flex flex-col space-y-1 px-3 py-2'>
							<div className='flex h-0 flex-1'>
								<ToastAction
									asChild
									altText={actionAltText as string}
								>
									{action}
								</ToastAction>
							</div>
							<div className='flex h-0 flex-1'>
								<ToastPrimitive.Close className='flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-gray-100 dark:hover:bg-gray-900'>
									Dismiss
								</ToastPrimitive.Close>
							</div>
						</div>
					</div>
				)}
			</ToastRoot>
			<ToastViewport />
		</ToastProvider>
	)
}

export default Toast
