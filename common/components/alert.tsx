import type { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import * as AlertPrimitive from '@radix-ui/react-alert-dialog'

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
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	title?: ReactNode | string
	description?: ReactNode | string
	cancel: ReactNode
	action: ReactNode
	overlay?: boolean
	trigger?: ReactNode
	contentClassName?: string
}

const Alert: FC<AlertProps> = ({
	open,
	setOpen,
	title = '',
	description = '',
	cancel,
	action,
	overlay = false,
	trigger = null,
	contentClassName = '',
}) => {
	return (
		<AlertRoot open={open} onOpenChange={setOpen}>
			{trigger && <AlertTrigger>{trigger}</AlertTrigger>}
			<AlertPortal>
				{overlay && <AlertOverlay />}
				<AlertContent
					className={`rounded-md p-4 shadow-md outline-none ${contentClassName}`}
				>
					{title && <AlertTitle>{title}</AlertTitle>}
					{description && (
						<AlertDescription>{description}</AlertDescription>
					)}
					<div className='flex items-center justify-center space-x-4'>
						<AlertCancel>{cancel}</AlertCancel>
						<AlertAction>{action}</AlertAction>
					</div>
				</AlertContent>
			</AlertPortal>
		</AlertRoot>
	)
}

export default Alert
