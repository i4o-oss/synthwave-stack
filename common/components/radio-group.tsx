import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { FC } from 'react'

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
						className='h-6 w-6 rounded-full border-2 border-brand-500 hover:bg-brand-50 hover:bg-opacity-20'
						key={option.id}
						id={option.id}
						value={option.value}
					>
						<RadioGroupIndicator className='relative flex h-full w-full items-center justify-center after:block after:h-3 after:w-3 after:rounded-full after:bg-brand-500 after:content-[""]' />
					</RadioGroupItem>
					<label htmlFor={option.id}>{option.label}</label>
				</div>
			))}
		</RadioGroupRoot>
	)
}

export default RadioGroup
