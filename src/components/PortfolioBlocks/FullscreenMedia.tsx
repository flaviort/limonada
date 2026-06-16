// libraries
import clsx from 'clsx'
import Image from 'next/image'

// components
import Section from './Section'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Video from '@/components/Video'

// interface
interface Props {
    image?: string
    video?: string
    alt?: string
}

export default function FullscreenMedia({
    image,
    video,
    alt
}: Props) {
    return (
        <Section className={clsx(
            image && 'h-[120svh]',
            video && 'h-[110svh]',
            'bg-black'
        )}>

            {image && (
                <ScrollingImage>
                    <Image
                        src={image}
                        alt={alt || ''}
                        fill
                        className='cover'
                        loading='lazy'
                        sizes='100vw'
                    />
                </ScrollingImage>
            )}

            {video && (
                <Video
                    video={video}
                    className='cover'
                />
            )}
        </Section>
    )
}