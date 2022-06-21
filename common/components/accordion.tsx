import type { FC, ReactNode } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type {
	AccordionSingleProps,
	AccordionMultipleProps,
} from '@radix-ui/react-accordion'

const AccordionRoot = AccordionPrimitive.Root
const AccordionContent = AccordionPrimitive.Content
const AccordionItem = AccordionPrimitive.Item
const AccordionTrigger = AccordionPrimitive.Trigger

interface AccordionItemType {
	id: string
	title: string | ReactNode
	content: string | ReactNode
}

interface AccordionSingle extends AccordionSingleProps {
	collapsible: boolean
	defaultValue: string
	items: AccordionItemType[]
	type: 'single'
}

interface AccordionMultiple extends AccordionMultipleProps {
	collapsible: boolean
	defaultValue: string[] | undefined
	items: AccordionItemType[]
	type: 'multiple'
}

const Accordion: FC<AccordionSingle | AccordionMultiple> = ({
	collapsible,
	defaultValue,
	items,
	type,
}) => {
	return (
		// @ts-ignore
		<AccordionRoot
			type={type}
			defaultValue={defaultValue}
			collapsible={collapsible}
		>
			{items.map((item) => {
				return (
					<AccordionItem key={item.id} value={item.id}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				)
			})}
		</AccordionRoot>
	)
}

export default Accordion
