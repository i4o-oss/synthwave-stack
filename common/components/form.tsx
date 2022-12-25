import type { FormProps as RFormProps } from '@remix-run/react'

import { Form as RForm, useLocation } from '@remix-run/react'

export type FormProps = RFormProps & {
	/**
	 * Allows the passing of a fetcher.Form
	 * @default RForm
	 */
	as?: typeof RForm
	/*
	 * Used on routes with multiple actions to identify the submitted form.
	 * @default undefined
	 */
	actionId?: string
	/*
	 * Tells the action where to send a successful response
	 * @default undefined
	 */
	redirectTo?: string
}

export default function Form({
	children,
	as,
	actionId,
	redirectTo,
	method = 'post',
	...props
}: FormProps) {
	const { pathname } = useLocation()
	const { csrf } = useRootLoaderData()
	const _Form = as || RForm
	return (
		<_Form {...props} method={method === 'get' ? 'get' : 'post'}>
			<input type='hidden' name='_referrer' value={pathname} />
			<input type='hidden' name='_csrf' value={csrf} />
			<input type='hidden' name='_method' value={method} />
			{actionId ? (
				<input type='hidden' name='action' value={actionId} />
			) : null}
			{redirectTo ? (
				<input type='hidden' name='redirectTo' value={redirectTo} />
			) : null}
			{children}
		</_Form>
	)
}
