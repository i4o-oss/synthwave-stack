import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'

export let loader: LoaderFunction = async ({ request }) => {
	switch (request.method) {
		case 'GET': {
			return json({ message: 'healthy' }, 200)
		}
	}
}
