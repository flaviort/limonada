import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends Omit<ImageProps, 'quality'> {
	quality?: number
}

export default function CustomImage({ quality = 100, ...props }: CustomImageProps) {
	return <Image quality={quality} {...props} />
}

