import type { UploadHandler } from '@remix-run/node'
import S3 from 'aws-sdk/clients/s3'

const REGION = process.env.MY_AWS_DEFAULT_REGION
const AWS_ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY

const storage = new S3({
	region: REGION,
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

export const uploadHandler: UploadHandler = async ({
	name,
	filename,
	stream,
	// userId,
	// postId,
}) => {
	if (name !== 'image') {
		stream.resume()
		return
	}

	const { Location } = await storage
		.upload({
			Bucket: '<s3-bucket-name>', // TODO: Update S3 bucket name
			Key: `images/${filename}`, // TODO: (Optional) Update uploads path
			Body: stream,
		})
		.promise()

	return Location
}
