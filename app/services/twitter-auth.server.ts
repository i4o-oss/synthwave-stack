import { Authenticator } from 'remix-auth'
import { Twitter2Strategy } from 'remix-auth-twitter'
import TwitterApi from 'twitter-api-v2'
import type { User } from '../models/user.server'
import { findOrCreate } from '../models/user.server'
import { sessionStorage } from '~/services/session.server'

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID as string
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET as string

if (!TWITTER_CLIENT_ID) {
	throw new Error('Missing TWITTER_CLIENT_ID environment variable')
}
if (!TWITTER_CLIENT_SECRET) {
	throw new Error('Missing TWITTER_CLIENT_SECRET environment variable')
}

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	new Twitter2Strategy(
		{
			clientID: TWITTER_CLIENT_ID,
			clientSecret: TWITTER_CLIENT_SECRET,
			callbackURL: `${process.env.APP_URL}/auth/twitter/callback`,
			// List of scopes you want to be granted. See
	        // @ts-ignore
			scopes: ['users.read', 'tweet.read', 'tweet.write'],
		},
		// Define what to do when the user is authenticated
		async ({ accessToken }) => {
			// In this example I want to use Twitter as identity provider: so resolve identity from the token
			const userClient = new TwitterApi(accessToken)

			const result = await userClient.v2.me({
				'user.fields': ['profile_image_url'],
			})
			// should handle errors
			const { id, username } = result.data

			// Return a user object to store in sessionStorage.
			// You can also throw Error to reject the login
			return await findOrCreate({ id, username }, 'twitter')
		}
	)
)

