'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'

// interface
interface Props {
    image: string
    subtitle: string
    title: string
    children: React.ReactNode
}

export default function BannerInternal({
    image,
    subtitle,
    title,
    children
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.to('[data-bg]', {
                opacity: 0.25,
                scale: 1.1,
                scrollTrigger: {
                    pin: '[data-bg]',
                    anticipatePin: 1,
                    pinType: 'fixed',
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }
    }, {
        scope: sectionRef
    })

    return (
        <section
            className='bg-black overflow-hidden'
            style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            ref={sectionRef}
        >

            <div
                className='absolute z-0 top-0 left-0 w-full min-h-vh min-h-svh opacity-60'
                data-bg
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className='object-cover'
                    loading='eager'
                    sizes='100vw'
                    priority
                />
            </div>

            <div className='base-container relative z-2'>

                <div className='row'>
                    <div className='col-lg-6'>

                        <div className='flex flex-col-reverse gap-4 lg:gap-5 justify-start pb-[6svh] min-h-vh min-h-svh relative pt-40'>

                            <h1 className='text-60 font-semibold text-white tracking-tight leading-[1.1]!'>
                                {title}
                            </h1>

                            <h2 className='text-20 text-yellow'>
                                {subtitle}
                            </h2>

                        </div>

                        <div className='flex flex-col pt-5 pb-60'>
                            <TextReveal>
                                {children}
                            </TextReveal>
                        </div>

                    </div>
                </div>

            </div>
            
        </section>
    )
}