import type { FC, ReactNode } from 'react'
import { useState, Fragment } from 'react'
import * as AlertPrimitive from '@radix-ui/react-alert-dialog'
import { Transition } from '@headlessui/react'
import cx from 'classnames'

export const AlertRoot = AlertPrimitive.Root
export const AlertTrigger = AlertPrimitive.Trigger
export const AlertPortal = AlertPrimitive.Portal
export const AlertOverlay = AlertPrimitive.Overlay
export const AlertContent = AlertPrimitive.Content
export const AlertTitle = AlertPrimitive.Title
export const AlertDescription = AlertPrimitive.Description
export const AlertCancel = AlertPrimitive.Cancel
export const AlertAction = AlertPrimitive.Action

type AlertProps = {
	title?: ReactNode | string
	description?: ReactNode | string
	cancel: ReactNode
	action: ReactNode
	trigger?: ReactNode
}

const Alert: FC<AlertProps> = ({
	title = '',
	description = '',
	cancel,
	action,
	trigger = null,
}) => {
	let [isOpen, setIsOpen] = useState(false)

	return (
		<AlertRoot open={isOpen} onOpenChange={setIsOpen}>
			{trigger && <AlertTrigger asChild>{trigger}</AlertTrigger>}
			<AlertPortal>
				<Transition.Root show={isOpen}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<AlertOverlay
							forceMount
							className='fixed inset-0 z-20 bg-black/50'
						/>
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<AlertContent
							forceMount
							className={cx(
								'fixed z-50',
								'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
								'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
								'bg-white dark:bg-gray-800',
								'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
							)}
						>
							{title && (
								<AlertTitle className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									{title}
								</AlertTitle>
							)}
							{description && (
								<AlertDescription className='mt-2 text-sm font-normal text-gray-700 dark:text-gray-400'>
									{description}
								</AlertDescription>
							)}
							<div className='mt-4 flex justify-end space-x-2'>
								<AlertCancel
									className={cx(
										'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
										'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600',
										'border border-gray-300 dark:border-transparent',
										'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
									)}
								>
									{cancel}
								</AlertCancel>
								<AlertAction
									className={cx(
										'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
										'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600',
										'border border-transparent',
										'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
									)}
								>
									{action}
								</AlertAction>
							</div>
						</AlertContent>
					</Transition.Child>
				</Transition.Root>
			</AlertPortal>
		</AlertRoot>
	)
}

export default Alert
