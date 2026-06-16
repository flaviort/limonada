'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function TagSwap() {

    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const tl = gsap.timeline({
            paused: true
        })

        tl.from('.tag', {
            yPercent: 130,
            rotate: -5,
            ease: 'back.out(1.7)',
        })

        ScrollTrigger.create({
            scroller: document.getElementById('viewport') as HTMLElement,
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 70%',
            scrub: 2,
            animation: tl
        })
    }, {
        scope: containerRef
    })

	return (
		<section className='overflow-hidden bg-black pt-10 lg:py-20'>
            <div className='base-container'>
                <div
                    className='relative'
                    ref={containerRef}
                >

                    <Image
                        src='/img/svg/tag-acontece.svg'
                        alt='Acontece'
                        width={1688}
                        height={496}
                        className='w-full h-auto'
                    />

                    <Image
                        src='/img/svg/tag-na-esfera.svg'
                        alt='Na Esfera'
                        width={1688}
                        height={496}
                        className='w-full h-auto absolute z-2 top-0 left-0 tag'
                    />

                </div>
            </div>
        </section>
	)
}