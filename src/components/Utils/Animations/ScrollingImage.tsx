'use client'

// libraries
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
    children: React.ReactNode
}

export default function ScrollingImage({
    children
}: Props) {

    const item = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    let calcSize
    let size

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
        calcSize = 'calc(100% + 7rem)'
        size = '-7rem'
    } else {
        calcSize = 'calc(100% + 3rem)'
        size = '-3rem'
    }

    useGSAP(() => {
        const trigger = item.current
        if (!trigger) return

        const timer = setTimeout(() => {
            const children = trigger.children

            Array.from(children).forEach(child => {
                child.classList.add('cover')
            })

            gsap.set(children, {
                height: calcSize,
                display: 'block'
            })

            gsap.from(children, {
                y: size,
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: trigger,
                    scrub: 2,
                    end: 'bottom top'
                }
            })
        }, 50)

        return () => clearTimeout(timer)

	}, { dependencies: [pathname] })

    return (
        <div
            ref={item}
            className='absolute overflow-hidden top-0 left-0 w-full h-full'
        >
            {children}
        </div>
    )
}