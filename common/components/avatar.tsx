import type { FC, ReactNode } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

export const AvatarRoot = AvatarPrimitive.Root
export const AvatarImage = AvatarPrimitive.Image
export const AvatarFallback = AvatarPrimitive.Fallback

interface AvatarProps {
	src?: string
	alt?: string
	fallback?: ReactNode | string
}

const Avatar: FC<AvatarProps> = ({ alt, fallback, src }) => {
	return (
		<AvatarRoot className='flex h-full w-full items-center justify-center text-white'>
			<AvatarImage alt={alt} src={src} />
			<AvatarFallback delayMs={500}>{fallback}</AvatarFallback>
		</AvatarRoot>
	)
}

export default Avatar
