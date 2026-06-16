'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// components
import Section from './Section'
//import Video from '@/components/Video'

// interface
interface Props {
    media: {
        image?: string
        video?: string
        alt?: string
    }[]
}

export default function ExpandingGrid({
    media
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!sectionRef.current) return

        const commonProps = {
            scroller: document.getElementById('viewport') as HTMLElement,
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%'
        }

        ScrollTrigger.create({
            pin: true,
            anticipatePin: 1,
            pinType: 'fixed',
            ...commonProps
        })

        const scrollTriggerProps = {
            scrollTrigger: {
                scrub: true,
                ...commonProps
            }
        }

        gsap.to('[data-position="0"]', {
            scale: 4,
            ...scrollTriggerProps
        })

        gsap.to('.main-element', {
            ...scrollTriggerProps
        })

        gsap.from('.main-element > *', {
            scale: 1.5,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="1"]', {
            scale: 5,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="2"]', {
            scale: 6,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="3"]', {
            scale: 8,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="4"]', {
            scale: 5,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="5"]', {
            scale: 6,
            ...scrollTriggerProps
        })

        gsap.to('[data-position="6"]', {
            scale: 9,
            ...scrollTriggerProps
        })

    }, {
        scope: sectionRef
    })

    return (
        <Section
            className='overflow-hidden h-svh min-h-svh'
            ref={sectionRef}
        >
            {media.map((item, i) => (
                <Block
                    key={i}
                    order={i}
                    className={clsx(
                        i === 0 && 'main-element top-1/2 left-1/2 w-[26.25vw] h-[25svh] -translate-x-1/2 -translate-y-1/2',
                        i === 1 && 'element-01 top-[10vh] lg:top-[5vh] left-[36.80556vw] w-[35vw] lg:w-[31.25vw] h-[26.5svh] lg:h-[30svh]',
                        i === 2 && 'element-02 top-[32.5svh] lg:top-[22.5svh] left-[3vw] lg:left-[15.97222vw] w-[32vw] lg:w-[19.16667vw] h-[30svh] lg:h-[40svh]',
                        i === 3 && 'element-03 top-[37.5svh] lg:top-1/2 left-[64.93056vw] w-[26.25vw] h-[20svh] lg:h-[25svh] lg:-translate-y-1/2',
                        i === 4 && 'element-04 top-[63.25svh] lg:top-[65svh] left-[10.06944vw] w-[31.25vw] h-[15svh] lg:h-[30svh]',
                        i === 5 && 'element-05 top-[63.25svh] lg:top-[65svh] left-[43.05556vw] w-[20.13889vw] h-[25svh] lg:h-[30svh]',
                        i === 6 && 'element-06 top-[58.25svh] lg:top-[65svh] left-[64.93056vw] w-[19.16667vw] h-[20vw] lg:h-[12.84722vw]',
                    )}
                    image={item.image}
                    video={item.video}
                    alt={item.alt || ''}
                />
            ))}
        </Section>
    )
}

// reusable block component
interface BlockProps {
    order: number
    className: string
    image?: string
    video?: string
    alt?: string
}

export const Block = ({
    order,
    className,
    image,
    video,
    alt
}: BlockProps) => {
    return (
        <div
            className='absolute inset-0'
            data-position={order}
        >
            <div className={clsx(
                'absolute overflow-hidden rounded-xs bg-black',
                className
            )}>

                {image && (
                    <Image
                        src={image}
                        alt={alt || ''}
                        fill
                        className='cover'
                        sizes='100vw'
                    />
                )}

                {video && (
                    <video
                        loop
                        muted
                        playsInline
                        autoPlay
                        className='cover'
                    >
                        <source
                            src={video}
                            type='video/mp4'
                        />
                    </video>
                )}

            </div>
        </div>
    )
}