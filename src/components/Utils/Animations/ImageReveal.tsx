'use client'

// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
    src: string
    alt: string
    className?: string
    overlay: 'purple' | 'pink' | 'white' | 'gray' | 'wine' | 'black'
}

export default function ImageReveal({
    src,
    alt,
    className,
    overlay
}: Props) {

    const containerRef = useRef<HTMLDivElement>(null)
    const revealRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useGSAP(() => {
        if (!containerRef.current || !revealRef.current || !imageRef.current) return

        const reveal = revealRef.current
        const image = imageRef.current

        const timeline = gsap.timeline({ paused: true })

        timeline.set(image, {
            scale: 1.5
        })

        timeline.to(reveal, {
            width: '100%',
            ease: 'power4.inOut',
            duration: .75
        })

        timeline.to(reveal, {
            x: '100%',
            ease: 'power4.in',
            duration: 1
        })

        timeline.to(image, {
            visibility: 'visible',
            scale: 1,
            duration: 2.5,
            ease: 'power4.out'
        }, '=-1')

        ScrollTrigger.create({
            scroller: document.getElementById('viewport') as HTMLElement,
            trigger: containerRef.current,
            start: '0% 120%',
            end: '100% -20%',
            onEnter: () => timeline.play(),
            onLeaveBack: () => timeline.reverse()
        })

    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className={clsx('image-reveal', className)}
        >
            <div
                ref={revealRef}
                className={clsx(
                    'reveal',
					overlay === 'purple' && 'bg-purple',
					overlay === 'pink' && 'bg-pink',
					overlay === 'white' && 'bg-white',
					overlay === 'gray' && 'bg-gray-light',
					overlay === 'wine' && 'bg-wine',
					overlay === 'black' && 'bg-gray-darker'
                )}
            />

            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                className='cover'
                fill
				loading='lazy'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    )
}