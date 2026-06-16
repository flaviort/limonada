// libraries
import Image from 'next/image'

// components
import Section from './Section'
import Video from '@/components/Video'

interface Props {
    media: {
        image?: string
        video?: string
        alt?: string
    }[]
}

export default function TwoMedia({
    media
}: Props) {
    return (
        <Section>
            <div className='base-container'>
                <div className='row gap-16 sm:gap-28 lg:gap-0'>
                    {media.map((item, i) => (
                        <Media
                            key={i}
                            image={item.image}
                            video={item.video}
                            alt={item.alt || ''}
                        />
                    ))}
                </div>
            </div>
        </Section>
    )
}

interface MediaProps {
    image?: string
    video?: string
    alt?: string
}

export const Media = ({
    image,
    video,
    alt
}: MediaProps) => {
    return (
        <div className='col-12 col-lg-6'>
            <div className='relative overflow-hidden block w-full aspect-4/3 rounded-md bg-black'>

                {image && (
                    <Image
                        src={image}
                        alt={alt || ''}
                        fill
                        className='cover'
                        loading='lazy'
                        sizes='(max-width: 1200px) 100vw, 50vw'
                    />
                )}

                {video && (
                    <Video
                        video={video}
                        className='cover'
                    />
                )}

            </div>
        </div>
    )
}