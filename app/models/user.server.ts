import { prisma } from '~/db.server'
export type { User } from '@prisma/client'

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } })
}

// @ts-ignore
export async function findOrCreate(profile, provider) {
	let email = provider === 'google' ? profile.emails[0].value : profile.email
	let user = await getUserByEmail(email)
	if (user) {
		return user
	} else {
		const image = provider === 'google' ? profile.photos[0].value : ''
		const name = provider === 'google' ? profile.displayName : ''
		const newUser = await createUser({ email, image, name, provider })
		return newUser
	}
}

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return user
}

interface CreateUserParams {
	email: string
	image?: string
	name?: string
	provider?: string
}

export async function createUser({
	email,
	image = '',
	name = '',
	provider = '',
}: CreateUserParams) {
	const user = await prisma.user.create({
		data: {
			email,
			image,
			name,
			// @ts-ignore
			provider,
		},
	})

	return user
}
