'use client'

// libraries
import { useEffect, useRef } from 'react'
import { Link } from 'next-transition-router'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import Logo from '@/components/Svg/Logo'

// utils
import { contact, pages, social } from '@/utils/routes'
import { getYear } from '@/utils/functions'

// lemon images
import lemon1 from '@/assets/img/lemon-1.png'
import lemon2 from '@/assets/img/lemon-2.png'
import lemon3 from '@/assets/img/lemon-3.png'
import lemon4 from '@/assets/img/lemon-4.png'
import lemon5 from '@/assets/img/lemon-5.png'

const LEMONS = [lemon1.src, lemon2.src, lemon3.src, lemon4.src, lemon5.src]

export default function Footer() {

	const footerRef = useRef<HTMLElement>(null)
	const pathname = usePathname()
	const year = getYear(new Date().getFullYear().toString())

	useEffect(() => {
		const root = footerRef.current
		if (!root) return

		let incr = 0, oldIncrX = 0, oldIncrY = 0, firstMove = true, indexImg = 0

		const isCoarsePointer = window.matchMedia('(hover: none)').matches
		const resetDist = window.innerWidth / (isCoarsePointer ? 6 : 8)

		function applyMove(clientX: number, clientY: number) {
			const rect = root!.getBoundingClientRect()

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

		function createLemon(x: number, y: number, deltaX: number, deltaY: number) {
			const H = root!.offsetHeight
			if (y > H - 100) return

			const img = document.createElement('img')
			img.src = LEMONS[indexImg]
			img.style.cssText = 'width:12vw;height:12vw;min-width:70px;min-height:70px;position:absolute;object-fit:contain;z-index:20;pointer-events:none;'
			root!.appendChild(img)

			const tl = gsap.timeline({
				onComplete: () => { root!.removeChild(img); tl.kill() }
			})

			tl.fromTo(img, {
				xPercent: -50 + (Math.random() - 0.5) * 80,
				yPercent: -50 + (Math.random() - 0.5) * 10,
				scaleX: 1.3,
				scaleY: 1.3,
				rotation: (Math.random() - 0.5) * 20
			}, {
				scaleX: 1,
				scaleY: 1,
				ease: 'elastic.out(2, 0.6)',
				duration: 0.4
			})

			tl.fromTo(img, { x }, {
				x: '+=' + deltaX * 2,
				rotation: 0,
				ease: 'power1.in',
				duration: 0.4
			}, '<')

			tl.fromTo(img, { y }, {
				y: '+=' + (H - y),
				scale: 0.9,
				yPercent: -95,
				ease: 'back.in(1.1)',
				duration: 0.4
			}, '<')

			tl.to(img, {
				x: '+=' + deltaX * 1.6,
				rotation: (Math.random() - 0.5) * 40,
				ease: 'power1.in',
				duration: 0.3
			})
			tl.to(img, {
				yPercent: 150,
				ease: 'back.in(' + (1.5 + (1 - y / H)) + ')',
				duration: 0.3
			}, '<')

			indexImg = (indexImg + 1) % LEMONS.length
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
	}, [])

	const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const viewport = document.getElementById('viewport')
		if (viewport) {
			gsap.to(viewport, {
				scrollTop: 0,
				duration: 1.5,
				ease: 'power1.inOut'
			})
		}
	}

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Only handle internal page links (not email, phone, or external links)
		if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
			return
		}

		// Remove hash from href for comparison
		const hrefPath = href.split('#')[0]
		const currentPath = pathname.split('#')[0]

		// If we're on the same page, smooth scroll to top
		if (hrefPath === currentPath) {
			scrollToTop(e)
		}
	}

	return (
		<footer
			ref={footerRef}
			className='bg-green-dark rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-4xl sm:rounded-tr-4xl md:rounded-tl-[3rem] md:rounded-tr-[3rem] -mt-4 sm:-mt-8 md:-mt-12 relative z-10 text-green-light overflow-hidden'
			data-main-footer
		>
			<div className='base-container relative'>
				<div className='flex flex-col justify-between gap-30 sm:gap-10 pb-4 md:pb-10 pt-10 xs:pt-14 sm:pt-20 min-h-lvh'>

					<div className='row'>
						
						<div className='col-md-4'>

							<ul className='flex flex-col gap-2 xs:gap-x-8 md:gap-5.5 xs:flex-row md:flex-col flex-wrap'>
								{[
									{
										label: 'A Limonada',
										href: pages.home
									},
									{
										label: 'Quem Somos',
										href: pages.quem_somos
									},
									{
										label: 'Método Limão',
										href: pages.metodo_limao
									},
									{
										label: 'Conteúdo',
										href: pages.conteudo
									},
									{
										label: 'Contato',
										href: pages.contato
									}
								].map((item, i) => (
									<li key={i}>
										<Link
											href={item.href}
											className='hover-underline md:text-lg xl:text-xl'
											onClick={(e) => handleLinkClick(e, item.href)}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className='col-md-4 my-6 sm:my-10 md:my-0'>
							<ul className='flex flex-col gap-2 xs:gap-x-8 md:gap-5.5 xs:flex-row md:flex-col flex-wrap'>
								{[
									{
										label: 'Instagram',
										href: social.instagram
									},
									{
										label: 'Linkedin',
										href: social.linkedin
									},
									{
										label: 'Youtube',
										href: social.youtube
									}
								].map((item, i) => (
									<li key={i}>
										<a
											href={item.href}
											target='_blank'
											rel='noopener noreferrer'
											className='hover-underline md:text-lg xl:text-xl'
											onClick={(e) => handleLinkClick(e, item.href)}
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className='col-md-4'>

							<p className='md:text-lg xl:text-xl leading-relaxed'>
								Inscreva-se para receber conteúdos autorais, relevantes e estratégicos sobre desenvolvimento de líderes, equipes e negócios.
							</p>

							<form action=''>

								<input
									type='email'
									name='email'
									placeholder='nome@email.com.br'
									className='w-full border-b border-green-light block lg:text-lg mt-6 sm:mt-8 mb-4 sm:mb-6 outline-none bg-transparent'
								/>

								<MagneticButton className='max-sm:w-full'>
									<button
										type='submit'
										className='button button--green-neon md:-ml-1 max-sm:w-full!'
									>
										<span>
											Enviar
										</span>
									</button>
								</MagneticButton>
								
							</form>

						</div>

					</div>

					<div className='flex flex-col gap-4 md:gap-6'>

						<Logo className='w-full h-auto text-green-light' />

						<div className='flex items-center justify-between gap-4 text-green-light text-xs sm:text-sm md:text-base'>

							<p>
								Todos os direitos reservados
							</p>

							<p>
								© {year} Limonada®
							</p>

						</div>

					</div>

				</div>
			</div>
		</footer>
	)
}