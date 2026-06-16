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
    category: string
    title: string
    subtitle: string
    text: string
    client: string
    year: string
    area: string
}

export default function Banner({
    image,
    category,
    title,
    subtitle,
    text,
    client,
    year,
    area
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
                />
            </div>

            <div className='base-container relative z-2'>

                <div className='flex flex-col gap-4 md:gap-6 lg:gap-8 justify-end pb-[6svh] min-h-vh min-h-svh relative lg:pr-50 pt-40'>

                    <p className='text-sm border border-white rounded-4xl px-4 py-1 text-white lg:absolute lg:bottom-[6svh] lg:right-0 w-fit -mb-2 lg:mb-0'>
                        {category}
                    </p>

                    <h1 className='font-heading uppercase text-100 font-semibold text-white tracking-tighter'>
                        {title}
                    </h1>

                    <h2 className='text-20 text-white'>
                        {subtitle}
                    </h2>

                </div>

                <div className='flex flex-col justify-center py-[5svh] lg:py-[8svh] lg:min-h-vh lg:min-h-svh sm:gap-[5svh] lg:gap-[8svh]'>

                    <div className='row'>
                        <div className='col-12 col-md-10 col-lg-8 col-xl-6'>
                            <TextReveal>
                                <p className='text-20 leading-loose text-white'>
                                    {text}
                                </p>
                            </TextReveal>
                        </div>
                    </div>

                    <div className='row text-18 font-normal text-white'>

                        <div className='col-12 col-sm-4 col-lg-3 col-xl-2'>
                            <p className='block w-full sm:border-t sm:border-t-white pt-5 lg:pt-10'>
                                <b className='font-semibold!'>Cliente:</b><br />
                                {client}
                            </p>
                        </div>

                        <div className='col-12 col-sm-4 col-lg-3 col-xl-2'>
                            <p className='block w-full sm:border-t sm:border-t-white pt-5 lg:pt-10'>
                                <b className='font-semibold!'>Ano:</b><br />
                                {year}
                            </p>
                        </div>

                        <div className='col-12 col-sm-4 col-lg-3 col-xl-2'>
                            <p className='block w-full sm:border-t sm:border-t-white pt-5 lg:pt-10'>
                                <b className='font-semibold!'>Setor:</b><br />
                                {area}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
            
        </section>
    )
}