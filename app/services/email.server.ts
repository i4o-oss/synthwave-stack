import type { SendEmailFunction } from 'remix-auth-email-link'
import sgMail from '@sendgrid/mail'

const sg_secret = process.env.SG_EMAIL_API_KEY

// @ts-ignore
sgMail.setApiKey(sg_secret)

const sendEmail: SendEmailFunction<any> = async (options) => {
	const message = {
		to: options.emailAddress,
		from: process.env.EMAIL_FROM_ADDRESS,
		templateId: process.env.SG_MAGIC_LINK_TEMPLATE_ID,
		dynamicTemplateData: {
			subject: 'Log in to <App Name>', // TODO: Update app name here
			verify_url: options.magicLink,
			app_url: process.env.APP_URL,
		},
	}

	// @ts-ignore
	await sgMail.send(message)
}

export default sendEmail
