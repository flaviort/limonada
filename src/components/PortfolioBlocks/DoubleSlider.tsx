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
import Video from '@/components/Video'

// interface
interface Props {
    top: {
        image?: string
        video?: string
        alt?: string
    }[]
    bottom: {
        image?: string
        video?: string
        alt?: string
    }[]
}

export default function DoubleSlider({
    top,
    bottom
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!sectionRef.current) return

        gsap.fromTo('[data-slider-top]', {
            x: 0
        }, {
            x: '-15vw',
            scrollTrigger: {
                trigger: sectionRef.current,
                scroller: document.getElementById('viewport') as HTMLElement,
                start: '-10% 110%',
                end: '110% -20%',
                scrub: true
            }
        })

        gsap.fromTo('[data-slider-bottom]', {
            x: '-15vw'
        }, {
            x: '0',
            scrollTrigger: {
                trigger: sectionRef.current,
                scroller: document.getElementById('viewport') as HTMLElement,
                start: '-10% 110%',
                end: '110% -20%',
                scrub: true
            }
        })

    }, {
        scope: sectionRef
    })

    return (
        <Section
            className='overflow-hidden'
            ref={sectionRef}
        >

            <div
                className='inline-flex items-end mb-[4vw] lg:mb-[2vw]'
                data-slider-top
            >
                {top.map((item, i) => (
                    <div
                        key={i}
                        className={clsx(
                            'relative overflow-hidden rounded-sm block h-0 mr-[4vw] lg:mr-[2vw]',
                            'first:w-[25vw] lg:first:w-[20vw] first:pb-[14.06vw] lg:first:pb-[11.25vw]',
                            'last:w-[25vw] lg:last:w-[20vw] last:pb-[14.06vw] lg:last:pb-[11.25vw] last:mr-0 max-lg:last:hidden',
                            'max-lg:nth-[3]:mr-0',
                            'nth-[2]:w-[60vw] lg:nth-[2]:w-[40vw] nth-[2]:pb-[31.55vw] lg:nth-[2]:pb-[21vw]',
                            'nth-[3]:w-[35vw] lg:nth-[3]:w-[29vw] nth-[3]:pb-[19.69vw] lg:nth-[3]:pb-[16.31vw]',
                            'bg-black'
                        )}
                    >

                        {item.image && (
                            <Image
                                src={item.image}
                                alt={item.alt || ''}
                                fill
                                className='cover'
                                loading='lazy'
                                sizes='33vw'
                            />
                        )}

                        {item.video && (
                            <Video
                                video={item.video}
                                className='cover'
                            />
                        )}

                    </div>
                ))}
            </div>

            <div
                className='inline-flex items-start'
                data-slider-bottom
            >
                {bottom.map((item, i) => (
                    <div
                        key={i}
                        className={clsx(
                            'relative overflow-hidden rounded-sm block h-0 mr-[4vw] lg:mr-[2vw]',
                            'first:w-[25vw] lg:first:w-[20vw] first:pb-[14.06vw] lg:first:pb-[11.25vw]',
                            'last:w-[25vw] lg:last:w-[20vw] last:pb-[14.06vw] lg:last:pb-[11.25vw] last:mr-0 max-lg:last:hidden',
                            'max-lg:nth-[3]:mr-0',
                            'nth-[2]:w-[35vw] lg:nth-[2]:w-[29vw] nth-[2]:pb-[19.69vw] lg:nth-[2]:pb-[16.31vw]',
                            'nth-[3]:w-[60vw] lg:nth-[3]:w-[40vw] nth-[3]:pb-[31.55vw] lg:nth-[3]:pb-[21vw]',
                            'bg-black'
                        )}
                    >

                        {item.image && (
                            <Image
                                src={item.image}
                                alt={item.alt || ''}
                                fill
                                className='cover'
                                loading='lazy'
                                sizes='33vw'
                            />
                        )}

                        {item.video && (
                            <Video
                                video={item.video}
                                className='cover'
                            />
                        )}

                    </div>
                ))}
            </div>

        </Section>
    )
}