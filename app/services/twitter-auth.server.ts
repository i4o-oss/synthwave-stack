import { TwitterStrategy } from 'remix-auth-twitter'
import type { User } from '../models/user.server'
import { findOrCreate } from '../models/user.server'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'

const TWITTER_API_KEY = process.env.TWITTER_API_KEY as string
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET as string

if (!TWITTER_API_KEY)
	throw new Error('Missing TWITTER_API_KEY environment variable')
if (!TWITTER_API_KEY_SECRET)
	throw new Error('Missing TWITTER_API_KEY_SECRET environment variable')

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	// @ts-ignore
	new TwitterStrategy(
		{
			clientID: TWITTER_API_KEY,
			clientSecret: TWITTER_API_KEY_SECRET,
			callbackURL: 'http://localhost:3000/auth/twitter/callback',
			includeEmail: true,
		},
		async ({ accessToken, accessTokenSecret, profile }) => {
			return findOrCreate(profile, 'twitter')
		}
	)
)
