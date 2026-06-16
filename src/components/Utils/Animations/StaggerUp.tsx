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

export default function StaggerUp({
	className,
	children,
	infinite = false
}: Props) {
	
	const item = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!item.current) return

		const viewport = document.getElementById('viewport')
		if (!viewport) return

		const children = Array.from(item.current.children) as HTMLElement[]
		if (children.length === 0) return

		gsap.set(children, {
			opacity: 0,
			y: '20vh'
		})

		ScrollTrigger.batch(children, {
			start: '-50% 100%',
			scroller: viewport,
			onEnter: elements => {
				gsap.to(elements, {
					opacity: 1,
					y: 0,
					stagger: 0.125,
					duration: .5
				})
			},
			...(infinite && {
				onLeaveBack: elements => {
					gsap.to(elements, {
						opacity: 0,
						y: '20vh',
						stagger: 0.125,
						duration: .5
					})
				}
			})
		})

		ScrollTrigger.refresh()
	}, {
		scope: item,
		dependencies: [infinite]
	})

	return (
		<div ref={item} data-stagger className={className}>
			{children}
		</div>
	)
}