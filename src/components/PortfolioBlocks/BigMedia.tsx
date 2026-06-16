// libraries
import Image from 'next/image'

// components
import Section from './Section'
import Video from '@/components/Video'

// interface
interface Props {
    image?: string
    video?: string
    alt?: string
}

export default function BigMedia({
    image,
    video,
    alt
}: Props) {
    return (
        <Section>
            <div className='base-container'>
                <div className='relative bg-black overflow-hidden block w-full aspect-4/3 md:aspect-video rounded-md md:rounded-lg lg:rounded-xl'>

                    {image && (
                        <Image
                            src={image}
                            alt={alt || ''}
                            fill
                            className='object-cover'
                            loading='lazy'
                            sizes='100vw'
                        />
                    )}

                    {video && (
                        <Video
                            video={video}
                            className='w-full h-full object-cover'
                        />
                    )}

                </div>
            </div>
        </Section>
    )
}