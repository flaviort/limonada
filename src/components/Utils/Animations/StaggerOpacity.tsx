'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	className?: string
	children: React.ReactNode
	infinite?: boolean
}

export default function StaggerOpacity({
	className,
	children,
	infinite = false
}: Props) {
	
	const item = useRef(null)

	useGSAP(() => {
		if (item.current) {
		
			const children = (item.current as HTMLElement).children

			gsap.set(children, {
				opacity: 0
			})

			ScrollTrigger.batch(children, {
				scroller: document.getElementById('viewport') as HTMLElement,
				start: '-50% 100%',
				onEnter: elements => {
					gsap.to(elements, {
						opacity: 1,
						stagger: 0.2,
						duration: 1
					})
				},
				...(infinite && {
					onLeaveBack: elements => {
						gsap.to(elements, {
							opacity: 0,
							stagger: 0.2,
							duration: 1
						})
					}
				})
			})
		}
	})

	return (
		<div ref={item} data-stagger className={className}>
			{children}
		</div>
	)
}