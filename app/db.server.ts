import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
	let __db__: PrismaClient
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production, we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
} else {
	// TODO: figure out how to fix these typescript errors properly
	// @ts-ignore
	if (!global?.__db__) {
		// @ts-ignore
		global.__db__ = new PrismaClient()
	}
	// @ts-ignore
	prisma = global.__db__
	prisma.$connect()
}

export { prisma }
