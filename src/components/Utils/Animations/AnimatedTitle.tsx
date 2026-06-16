'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
    children: React.ReactNode
	style?: 'gray-yellow' | 'gray-black' | 'white-yellow'
    className?: string
}

export default function AnimatedTitle({
    children,
	style = 'gray-yellow',
    className
}: Props) {

    const item = useRef<HTMLHeadingElement>(null)
    const splitRef = useRef<SplitText | null>(null)

    useGSAP(() => {
		if (!item.current) return

		const initAnimation = async () => {
			// Wait for fonts to load before initializing SplitText
			if (typeof document !== 'undefined' && document.fonts) {
				await document.fonts.ready
			}

			if (!item.current) return

			if (splitRef.current) {
				splitRef.current.revert()
			}

			splitRef.current = new SplitText(item.current, {
				type: 'lines',
				tag: 'span'
			})

			splitRef.current.lines.forEach((item) => {
				gsap.to(item, {
					backgroundPositionX: 0,
					ease: 'none',
					scrollTrigger: {
						scroller: document.getElementById('viewport') as HTMLElement,
						trigger: item,
						scrub: true,
						start: 'top 75%',
						end: 'bottom 60%'
					}
				})
			})
		}

		initAnimation()

		// cleanup
		return () => {
			if (splitRef.current) {
				splitRef.current.revert()
				splitRef.current = null
			}
		}
	})

    return (
        <h2
			className={clsx(
				'fill-title',
				style === 'gray-yellow' && 'gray-yellow',
				style === 'gray-black' && 'gray-black',
				style === 'white-yellow' && 'white-yellow',
				className
			)}
			ref={item}
		>
            {children}
        </h2>
    )
}