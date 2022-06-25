import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { FC } from 'react'
import cx from 'classnames'

export const RadioGroupRoot = RadioGroupPrimitive.Root
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator
export const RadioGroupItem = RadioGroupPrimitive.Item
export const RadioGroupRadio = RadioGroupPrimitive.Radio

type RadioOption = {
	value: string
	id: string
	label: string
}

type RadioGroupProps = {
	className?: string
	defaultValue: string
	options: RadioOption[]
}

const RadioGroup: FC<RadioGroupProps> = ({
	className,
	defaultValue,
	options,
}) => {
	return (
		<RadioGroupRoot className={className} defaultValue={defaultValue}>
			{options.map((option) => (
				<div className='flex items-center space-x-2'>
					<RadioGroupItem
						className={cx(
							// Setting the background in dark properly requires a workaround (see css/tailwind.css)
							'h-4 w-4 rounded-full border border-transparent bg-gray-100 text-purple-600 dark:bg-gray-900',
							'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800',
							'border border-transparent radix-state-checked:border-brand-500'
						)}
						key={option.id}
						id={option.id}
						value={option.value}
					>
						<RadioGroupIndicator className='relative flex h-full w-full items-center justify-center rounded-full after:block after:h-2 after:w-2 after:rounded-full after:bg-brand-500 after:content-[""]' />
					</RadioGroupItem>
					<label className='text-sm' htmlFor={option.id}>
						{option.label}
					</label>
				</div>
			))}
		</RadioGroupRoot>
	)
}

export default RadioGroup
