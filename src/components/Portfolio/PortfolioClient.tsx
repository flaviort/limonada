'use client'

// libraries
import Image from 'next/image'
import { useTransitionRouter } from 'next-transition-router'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// interfaces
interface Props {
	projects: {
		href: string
		bgImage: {
			node: {
				mediaItemUrl: string
				sizes: string
			}
		}
		mainImage: {
			node: {
				mediaItemUrl: string
				sizes: string
			}
		}
		textLeft: string
		textRight: string
	}[]
}

export default function PortfolioClient({
	projects
}: Props) {

	const router = useTransitionRouter()
	const mouseDownRef = useRef<{ x: number; y: number; time: number } | null>(null)
	const isScrollingRef = useRef(false)

	const handleMouseDown = (e: React.MouseEvent) => {
		isScrollingRef.current = false
		mouseDownRef.current = {
			x: e.clientX,
			y: e.clientY,
			time: Date.now()
		}
	}

	const handleMouseMove = () => {
		if (mouseDownRef.current) {
			isScrollingRef.current = true
		}
	}

	const handleMouseUp = (e: React.MouseEvent, href: string) => {
		if (!mouseDownRef.current) return

		const deltaX = Math.abs(e.clientX - mouseDownRef.current.x)
		const deltaY = Math.abs(e.clientY - mouseDownRef.current.y)
		const deltaTime = Date.now() - mouseDownRef.current.time
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

		// If mouse moved less than 5px, took less than 300ms, and wasn't scrolling, consider it a click
		if (distance < 5 && deltaTime < 300 && !isScrollingRef.current) {
			e.preventDefault()
			e.stopPropagation()
			router.push(href)
		}

		mouseDownRef.current = null
		isScrollingRef.current = false
	}

	const containerRef = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!containerRef.current) return

		const bgs = gsap.utils.toArray('[data-bg]') as HTMLElement[]
		const bgImages = bgs.map(bg => bg.querySelector('img')).filter(Boolean) as HTMLElement[]
		const thumbnails = gsap.utils.toArray('[data-thumbnail]') as HTMLElement[]
		const thumbnailsImages = thumbnails.map(thumbnail => thumbnail.querySelector('img')).filter(Boolean) as HTMLElement[]
		const links = gsap.utils.toArray('[data-link]') as HTMLElement[]
		const textContainers = gsap.utils.toArray('[data-texts]') as HTMLElement[]

		const vh = window.innerHeight
		const itemsWithAnimation = projects.length - 1
		const pinDuration = itemsWithAnimation * vh

		gsap.set([bgs, thumbnails, links], { clipPath: 'inset(0% 0% 0% 0%)' })
		gsap.set(bgImages, { opacity: 1 })
		gsap.set(thumbnailsImages, { opacity: 1 })
		textContainers.forEach((container, i) => {
			const text = container.querySelector('p') as HTMLElement
			if (text) gsap.set(text, { y: Math.floor(i / 2) === 0 ? '0%' : '110%' })
		})

		// helper function
		const animateClipPath = (elements: HTMLElement[], progress: number) => {
			elements.forEach((el, index) => {
				if (index === projects.length - 1) {
					gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
					return
				}

				const sectionStart = index / itemsWithAnimation
				const sectionEnd = (index + 1) / itemsWithAnimation
				const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)

				if (progress >= sectionStart && progress <= sectionEnd) {
					gsap.set(el, { clipPath: `inset(0% 0% ${100 * sectionProgress}% 0%)` })
				} else {
					gsap.set(el, { clipPath: progress < sectionStart ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' })
				}
			})
		}

		ScrollTrigger.create({
			scroller: document.getElementById('viewport') as HTMLElement,
			trigger: containerRef.current,
			start: 'top top',
			end: `+=${pinDuration}`,
			pin: true,
			pinSpacing: true,
			pinType: 'fixed',
			anticipatePin: 1,
			invalidateOnRefresh: false
		})

		ScrollTrigger.create({
			scroller: document.getElementById('viewport') as HTMLElement,
			trigger: containerRef.current,
			start: 'top top',
			end: `+=${pinDuration}`,
			scrub: true,
			invalidateOnRefresh: false,
			onUpdate: (self) => {
				const progress = self.progress

				// animate clip-paths
				animateClipPath(bgs, progress)
				animateClipPath(thumbnails, progress)
				animateClipPath(links, progress)

				// animate bg
				bgs.forEach((bg, index) => {
					const bgImage = bg.querySelector('img') as HTMLElement
					if (!bgImage || index === projects.length - 1) return

					const sectionStart = index / itemsWithAnimation
					const sectionEnd = (index + 1) / itemsWithAnimation
					const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)

					if (progress >= sectionStart && progress <= sectionEnd) {
						gsap.set(bgImage, { opacity: 1 - (sectionProgress * 0.9) })
					} else {
						gsap.set(bgImage, { opacity: progress < sectionStart ? 1 : 0.1 })
					}
				})

				// animate thumbnailsImages opacity
				thumbnailsImages.forEach((thumbnail, index) => {
					if (index === projects.length - 1) {
						gsap.set(thumbnail, { opacity: 1 })
						return
					}

					const sectionStart = index / itemsWithAnimation
					const sectionEnd = (index + 1) / itemsWithAnimation
					const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)

					if (progress >= sectionStart && progress <= sectionEnd) {
						gsap.set(thumbnail, { opacity: 1 - (sectionProgress * 0.9) })
					} else {
						gsap.set(thumbnail, { opacity: progress < sectionStart ? 1 : 0.1 })
					}
				})

				// animate texts
				textContainers.forEach((container, containerIndex) => {
					const textIndex = Math.floor(containerIndex / 2)
					const text = container.querySelector('p') as HTMLElement
					if (!text) return

					const isFirst = textIndex === 0
					const isLast = textIndex === projects.length - 1
					const animStart = isFirst ? 0 : isLast ? (itemsWithAnimation - 0.5) / itemsWithAnimation : (textIndex - 0.5) / itemsWithAnimation
					const animEnd = isFirst ? 0.5 / itemsWithAnimation : isLast ? 1 : (textIndex + 0.5) / itemsWithAnimation
					const animProgress = (progress - animStart) / (animEnd - animStart)

					if (progress >= animStart && progress <= animEnd) {
						const translateY = isFirst ? -110 * animProgress : isLast ? 110 - (animProgress * 110) : 110 - (animProgress * 220)
						gsap.set(text, { y: `${translateY}%` })
					} else if (progress < animStart) {
						gsap.set(text, { y: isFirst ? '0%' : '110%' })
					} else {
						gsap.set(text, { y: isFirst || !isLast ? '-110%' : '0%' })
					}
				})
			}
		})

	}, { scope: containerRef, dependencies: [projects.length] })

	return (
		<section
			className='bg-black flex items-center justify-center overflow-hidden h-[calc(var(--vh)*100)] cursor-pointer'
			ref={containerRef}
		>

			<div
				className='absolute inset-0 w-full h-[calc(var(--vh)*100)] opacity-50'
				ref={bgRef}
			>
				{projects.map((item, i) => (
					<div
						key={i}
						className='absolute inset-0 w-full h-full bg-black'
						style={{ zIndex: projects.length - i }}
						data-bg
					>
						<Image
							src={item.bgImage.node.mediaItemUrl}
							sizes={item.bgImage.node.sizes}
							alt={item.textLeft}
							fill
							className='object-cover'
						/>
					</div>
				))}
			</div>

			<div className='relative z-10 w-full h-full'>

				<div className='absolute z-99 w-full h-full'>
					{projects.map((item, i) => (
						<div
							key={i}
							className='absolute inset-0 w-full h-full opacity-0'
							style={{ 
								zIndex: projects.length - i,
								pointerEvents: 'auto'
							}}
							data-link
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={(e) => handleMouseUp(e, item.href)}
							onClick={(e) => {
								// Fallback for touch devices
								if (!mouseDownRef.current && !isScrollingRef.current) {
									e.preventDefault()
									router.push(item.href)
								}
							}}
							aria-label={item.textLeft + ' - ' + item.textRight}
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									router.push(item.href)
								}
							}}
						/>
					))}
				</div>
				
				{projects.map((item, i) => (
					<div
						className='absolute w-full h-full'
						key={i}
						style={{ zIndex: projects.length - i }}
					>
						<div className='base-container h-full'>
							<div className='flex flex-col justify-center md:grid md:grid-cols-2 items-center h-full gap-5 md:gap-10 text-center'>

								<div
									data-texts
									className='relative z-3 overflow-hidden flex'
								>
									<p className='text-30 text-white md:max-w-[70%] md:text-left'>
										{item.textLeft}
									</p>
								</div>

								<div
									className='relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 overflow-hidden h-[50vh] max-w-[90%] w-auto aspect-square md:aspect-8/10 rounded-sm md:rounded-md mx-auto bg-black'
									data-thumbnail
								>
									<Image
										src={item.mainImage.node.mediaItemUrl}
										sizes={item.mainImage.node.sizes}
										alt={item.textLeft}
										fill
										className='object-cover'
									/>
								</div>

								<div
									data-texts
									className='relative z-3 overflow-hidden flex md:justify-end'
								>
									<p className='text-30 text-white md:text-right md:max-w-[70%]'>
										{item.textRight}
									</p>
								</div>

							</div>
						</div>
					</div>
				))}

			</div>

		</section>
	)
}