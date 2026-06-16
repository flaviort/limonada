'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	number: number
	className?: string
}

export default function Counter({
	number,
	className
}: Props) {
	
	const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		if (item.current) {

			// format the number in Brazilian standard (e.g., 1.000, 10.000)
			function formatBrazilianNumber(value: number | string) {
				return Math.floor(+value).toLocaleString('pt-BR')
			}

			gsap.set(item.current, {
				textContent: 0
			})

			gsap.to(item.current, {
				textContent: number,
				duration: 3,
				ease: 'power2.inOut',
				modifiers: {
					textContent: (value) => formatBrazilianNumber(value)
				},
				scrollTrigger: {
					scroller: document.getElementById('viewport') as HTMLElement,
					trigger: item.current,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			})
		}
	}, { dependencies: [number] })

	return (
		<span
			ref={item}
			className={className}
		>
			{number.toLocaleString('pt-BR')}
		</span>
	)
}
