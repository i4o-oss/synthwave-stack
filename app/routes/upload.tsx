import type { ActionFunction } from '@remix-run/node'
import { json, unstable_parseMultipartFormData } from '@remix-run/node'
import { uploadHandler } from '~/services/upload.server'

export let action: ActionFunction = async ({ request, params }) => {
	// const { userId, postId } = params
	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	)

	const file = formData.get('image')?.toString() || ''

	return json({ url: file }, 200)
}
