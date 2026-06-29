'use client'

// libraries
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// lemon images
import lemon1 from '@/assets/img/lemon-1.png'
import lemon2 from '@/assets/img/lemon-2.png'
import lemon3 from '@/assets/img/lemon-3.png'
import lemon4 from '@/assets/img/lemon-4.png'
import lemon5 from '@/assets/img/lemon-5.png'

const lemons = [lemon1.src, lemon2.src, lemon3.src, lemon4.src, lemon5.src]
const lemonClassName = 'absolute top-0 left-0 z-20 h-auto w-[22vw] md:w-[11vw] aspect-square object-contain pointer-events-none'

interface LemonTrailProps extends React.HTMLAttributes<HTMLElement> {
	as?: React.ElementType
}

function useLemonTrail(containerRef: React.RefObject<HTMLElement | null>) {
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const root: HTMLElement = container

		let incr = 0
		let oldIncrX = 0
		let oldIncrY = 0
		let firstMove = true
		let indexImg = 0

		const isCoarsePointer = window.matchMedia('(hover: none)').matches
		const resetDist = window.innerWidth / (isCoarsePointer ? 2 : 5)

		function createLemon(x: number, y: number, deltaX: number, deltaY: number) {
			const H = root.offsetHeight
			if (y > H - 100) return

			const img = document.createElement('img')
			img.src = lemons[indexImg]
			img.className = lemonClassName
			root.appendChild(img)

			const tl = gsap.timeline({
				onComplete: () => {
					root.removeChild(img)
					tl.kill()
				}
			})

			tl.fromTo(img, {
				xPercent: -50 + (Math.random() - 0.5) * 80,
				yPercent: -50 + (Math.random() - 0.5) * 10,
				rotation: (Math.random() - 0.5) * 20
			}, {
				ease: 'elastic.out(2, 0.6)',
				duration: 0.5
			})

			tl.fromTo(img, { x }, {
				x: '+=' + deltaX * 2,
				rotation: 0,
				ease: 'power1.in',
				duration: 0.5
			}, '<')

			tl.fromTo(img, { y }, {
				y: '+=' + (H - y),
				yPercent: -95,
				ease: 'back.in(1.1)',
				duration: 0.5
			}, '<')

			tl.to(img, {
				x: '+=' + deltaX * 1.6,
				rotation: (Math.random() - 0.5) * 40,
				ease: 'power1.in',
				duration: 0.4
			})

			tl.to(img, {
				yPercent: 150,
				ease: 'back.in(' + (1.5 + (1 - y / H)) + ')',
				duration: 0.4
			}, '<')

			indexImg = (indexImg + 1) % lemons.length
		}

		function applyMove(clientX: number, clientY: number) {
			const rect = root.getBoundingClientRect()

			if (firstMove) {
				firstMove = false
				oldIncrX = clientX
				oldIncrY = clientY
				return
			}

			incr += Math.abs(clientX - oldIncrX) + Math.abs(clientY - oldIncrY)

			if (incr > resetDist) {
				incr = 0
				createLemon(
					clientX - rect.left,
					clientY - rect.top,
					clientX - oldIncrX,
					clientY - oldIncrY
				)
			}

			oldIncrX = clientX
			oldIncrY = clientY
		}

		const onMouseMove = (e: MouseEvent) => applyMove(e.clientX, e.clientY)
		const onTouchMove = (e: TouchEvent) => {
			if (e.touches?.[0]) applyMove(e.touches[0].clientX, e.touches[0].clientY)
		}

		root.addEventListener('mousemove', onMouseMove)
		root.addEventListener('touchstart', onTouchMove, { passive: true })
		root.addEventListener('touchmove', onTouchMove, { passive: true })

		return () => {
			root.removeEventListener('mousemove', onMouseMove)
			root.removeEventListener('touchstart', onTouchMove)
			root.removeEventListener('touchmove', onTouchMove)
		}
	}, [containerRef])
}

const LemonTrail = function LemonTrail({
	as: Tag = 'div',
	className,
	children,
	...props
}: LemonTrailProps) {
	const containerRef = useRef<HTMLElement>(null)

	useLemonTrail(containerRef)

	return (
		<Tag
			ref={containerRef}
			className={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

export default LemonTrail

