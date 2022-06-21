import { GoogleStrategy } from 'remix-auth-google'
import type { User } from '~/models/user.server'
import { findOrCreate } from '~/models/user.server'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

if (!GOOGLE_CLIENT_ID)
	throw new Error('Missing GOOGLE_CLIENT_ID environment variable')
if (!GOOGLE_CLIENT_SECRET)
	throw new Error('Missing GOOGLE_CLIENT_SECRET environment variable')

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	// @ts-ignore
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
		},
		async ({ accessToken, refreshToken, extraParams, profile }) => {
			return findOrCreate(profile, 'google')
		}
	)
)
