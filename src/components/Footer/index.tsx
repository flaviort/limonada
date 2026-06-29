'use client'

// libraries
import { useRef } from 'react'
import { Link } from 'next-transition-router'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LemonTrail from '@/components/Utils/Animations/LemonTrail'
import Logo from '@/components/Svg/Logo'
import { Form, Input, InputHidden } from '@/components/Form'

// utils
import { pages, social } from '@/utils/routes'
import { getYear } from '@/utils/functions'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Footer() {

	const footerRevealRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()
	const year = getYear(new Date().getFullYear().toString())

	useGSAP(() => {
		const footerReveal = footerRevealRef.current
		const pageContent = document.getElementById('page-content')
		const spacer = document.querySelector('[data-footer-pin]') as HTMLElement | null
		const viewport = document.getElementById('viewport')

		if (!footerReveal || !pageContent || !spacer || !viewport) return

		const getFooterHeight = () => footerReveal.offsetHeight

		const setSpacerHeight = () => {
			gsap.set(spacer, { height: getFooterHeight() })
		}

		const forwardWheel = (e: WheelEvent) => {
			e.preventDefault()
			viewport.dispatchEvent(new WheelEvent('wheel', {
				deltaY: e.deltaY,
				deltaX: e.deltaX,
				bubbles: false,
				cancelable: true,
			}))
		}

		const mm = gsap.matchMedia()

		mm.add('(min-width: 768px)', () => {
			setSpacerHeight()

			gsap.set(footerReveal, {
				position: 'fixed',
				left: 0,
				bottom: 0,
				width: '100%',
				yPercent: 100,
				zIndex: 10,
			})

			ScrollTrigger.create({
				id: 'footer-reveal',
				trigger: spacer,
				start: 'top bottom',
				end: () => `+=${getFooterHeight()}`,
				scroller: viewport,
				scrub: true,
				pin: pageContent,
				pinSpacing: false,
				anticipatePin: 1,
				pinType: 'fixed',
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					gsap.set(footerReveal, { yPercent: 100 * (1 - self.progress) })
				},
			})

			footerReveal.addEventListener('wheel', forwardWheel, { passive: false })

			ScrollTrigger.addEventListener('refreshInit', setSpacerHeight)

			requestAnimationFrame(() => ScrollTrigger.refresh())

			return () => {
				footerReveal.removeEventListener('wheel', forwardWheel)
				ScrollTrigger.removeEventListener('refreshInit', setSpacerHeight)
				gsap.set(footerReveal, { clearProps: 'all' })
				gsap.set(spacer, { clearProps: 'height' })
			}
		})

		return () => mm.revert()
	}, {
		scope: footerRevealRef,
		dependencies: [pathname],
		revertOnUpdate: true,
	})

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
		if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
			return
		}

		const hrefPath = href.split('#')[0]
		const currentPath = pathname.split('#')[0]

		if (hrefPath === currentPath) {
			scrollToTop(e)
		}
	}

	return (
		<div
			ref={footerRevealRef}
			className='bg-green-dark rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-4xl sm:rounded-tr-4xl md:rounded-tl-[3rem] md:rounded-tr-[3rem] -mt-4 sm:-mt-8 md:mt-0 relative z-10 text-green-light pointer-events-none'
			data-main-footer
		>
			<LemonTrail className='relative w-full touch-pan-y pointer-events-auto'>
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

								<Form
									className='mt-6 mb-4 sm:mb-6'
									endpoint='/api/subscribe'
									onSuccess={{
										title: 'Inscrito com sucesso',
										text: 'Obrigado por se inscrever. Entraremos em contato o mais breve possível.'
									}}
									onError={{
										title: 'Ocorreu um erro ao se inscrever',
										text: 'Por favor, tente novamente mais tarde.'
									}}
								>

									<InputHidden
										name='newsletter'
										value='true'
										id='newsletter_form'
									/>

									<Input
										label='Email'
										id='newsletter_email'
										type='email'
										name='email'
										placeholder='nome@email.com.br'
										required
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
									
								</Form>

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
			</LemonTrail>
		</div>
	)
}