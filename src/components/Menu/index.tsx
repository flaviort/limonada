'use client'

// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// svg
import Logo from '@/assets/svg/logo/logo.svg'

// utils
import { contact, pages, socialLinks } from '@/utils/routes'

export default function Menu() {

	const headerRef = useRef<HTMLDivElement>(null)
	const menuAnimationRef = useRef<gsap.core.Timeline | null>(null)
	const scrollStateRef = useRef({
		lastScroll: 0,
		isScrollingUp: false,
		isInteracting: false,
		hideTimeout: null as NodeJS.Timeout | null
	})
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// helper function to check if a route is active (including nested routes)
	const isActiveRoute = (href: string) => {
		if (pathname === href) return true
		if (href === pages.portfolio && pathname.startsWith(pages.portfolio + '/')) return true
		return false
	}

	useGSAP(() => {
		menuAnimationRef.current = gsap.timeline({
			paused: true,
			onStart: () => {
				setIsMenuOpen(true)
				const viewport = document.getElementById('viewport')
				if (viewport) {
					viewport.style.overflow = 'hidden'
				}
				gsap.set('[data-fs-menu]', {
					pointerEvents: 'auto'
				})
			},
			onReverseComplete: () => {
				setIsMenuOpen(false)
				const viewport = document.getElementById('viewport')
				if (viewport) {
					viewport.style.overflow = ''
				}
				gsap.set('[data-fs-menu]', {
					pointerEvents: 'none'
				})

				gsap.set('[data-top-menu-button]', { clearProps: 'all' })
				gsap.set('[data-top-menu-social] a', { clearProps: 'all' })
				gsap.set('[data-top-menu-divider]', { clearProps: 'all' })
			}
		})
	
	menuAnimationRef.current.to('[data-fs-menu-bg] > div', {
		yPercent: -102,
		duration: 1,
		stagger: 0.2,
		ease: 'power2.inOut'
	})

	menuAnimationRef.current.to('[data-sticky-menu-bg]', {
		opacity: 0,
		duration: .3,
		ease: 'power2.inOut'
	}, '-=1')

	menuAnimationRef.current.to('[data-top-menu-social] a', {
		color: 'var(--color-gray-dark)',
		duration: .3,
		ease: 'power2.inOut'
	}, '<')

	menuAnimationRef.current.to('[data-top-menu-divider]', {
		backgroundColor: 'var(--color-gray-dark)',
		duration: .3,
		ease: 'power2.inOut',
	}, '<')

	menuAnimationRef.current.to('[data-top-menu-button]', {
		color: 'var(--color-gray-dark)',
		duration: .3,
		ease: 'power2.inOut',
	}, '<')

	menuAnimationRef.current.to('[data-fs-menu-list] > li', {
		translateY: 0,
		opacity: 1,
		duration: .6,
		ease: 'power2.inOut',
		stagger: 0.05
	}, '-=.75')

	menuAnimationRef.current.to('[data-top-menu-button-lines]', {
		opacity: 0,
		duration: .3,
		ease: 'power2.inOut',
	}, '<')

	menuAnimationRef.current.to('[data-fs-menu-contact]', {
		opacity: 1,
		duration: .6,
		ease: 'power2.inOut',
	}, '<')

	menuAnimationRef.current.to('[data-top-menu-button-lines-close]', {
		opacity: 1,
		duration: .3,
		ease: 'power2.inOut',
	}, '<+=.3')
		
	}, {
		scope: headerRef
	})

	const toggleFsMenu = () => {
		if (menuAnimationRef.current) {
			if (menuAnimationRef.current.reversed() || menuAnimationRef.current.progress() === 0) {
				menuAnimationRef.current.play()
			} else {
				menuAnimationRef.current.reverse()
			}
		}
	}

	const closeFsMenu = () => {
		if (menuAnimationRef.current) {
			menuAnimationRef.current.reverse()
		}
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeFsMenu()
			}
		}

		window.addEventListener('keydown', handleEscape)

		return () => {
			window.removeEventListener('keydown', handleEscape)
		}
	}, [])

	// hide sticky menu on route change
	useEffect(() => {
		const menu = document.querySelector('[data-sticky-menu]')

		if (menu) {
			menu.classList.remove('scrolling-up')
		}
		
		// reset scroll state
		scrollStateRef.current.lastScroll = 0
		scrollStateRef.current.isScrollingUp = false

		if (scrollStateRef.current.hideTimeout) {
			clearTimeout(scrollStateRef.current.hideTimeout)
			scrollStateRef.current.hideTimeout = null
		}
	}, [pathname])

	useEffect(() => {
		const viewport = document.getElementById('viewport')
		if (!viewport) return

		const state = scrollStateRef.current

		const showMenu = (menu: Element) => {
			state.isScrollingUp = true
			if (state.hideTimeout) {
				clearTimeout(state.hideTimeout)
				state.hideTimeout = null
			}
			menu.classList.add('scrolling-up')
		}

		const hideMenu = (menu: Element, immediate = false) => {
			state.isScrollingUp = false
			if (state.hideTimeout) clearTimeout(state.hideTimeout)

			const hide = () => menu.classList.remove('scrolling-up')

			if (immediate || state.isInteracting) {
				if (!state.isInteracting) hide()
			} else {
				state.hideTimeout = setTimeout(() => {
					if (!state.isInteracting) hide()
				}, 100)
			}
		}

		let ticking = false

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const menu = document.querySelector('[data-sticky-menu]')
					if (!menu) {
						ticking = false
						return
					}

					if (isMenuOpen) {
						menu.classList.add('scrolling-up')
						ticking = false
						return
					}

					const scroll = viewport.scrollTop
					const isAboveThreshold = scroll < 500
					const scrollDiff = state.lastScroll - scroll
					const isSignificantScroll = Math.abs(scrollDiff) > 3

					if (isAboveThreshold) {
						hideMenu(menu, true)
						state.lastScroll = scroll
						ticking = false
						return
					}

					if (isSignificantScroll) {
						const isScrollingUp = scrollDiff > 0

						if (isScrollingUp && !state.isScrollingUp) {
							showMenu(menu)
						} else if (!isScrollingUp && state.isScrollingUp) {
							hideMenu(menu)
						}

						state.lastScroll = scroll
					}

					ticking = false
				})
				ticking = true
			}
		}

		const handleInteractionStart = () => {
			state.isInteracting = true
			if (state.hideTimeout) {
				clearTimeout(state.hideTimeout)
				state.hideTimeout = null
			}
		}

		const handleInteractionEnd = () => {
			state.isInteracting = false
		}

		const menu = document.querySelector('[data-sticky-menu]')
		
		menu?.addEventListener('mouseenter', handleInteractionStart)
		menu?.addEventListener('mouseleave', handleInteractionEnd)
		menu?.addEventListener('touchstart', handleInteractionStart)
		menu?.addEventListener('touchend', handleInteractionEnd)

		viewport.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			viewport.removeEventListener('scroll', handleScroll)
			if (state.hideTimeout) clearTimeout(state.hideTimeout)
			
			menu?.removeEventListener('mouseenter', handleInteractionStart)
			menu?.removeEventListener('mouseleave', handleInteractionEnd)
			menu?.removeEventListener('touchstart', handleInteractionStart)
			menu?.removeEventListener('touchend', handleInteractionEnd)
		}
	}, [isMenuOpen])

	const topMenu = () => {
		return (
			<div
				className='base-container relative z-2'
				data-top-menu
			>
				<div className='flex items-center justify-between gap-10'>

					<MagneticButton>
						<Link
							href={pages.home}
							className='w-40 h-auto flex text-yellow -translate-y-1.5 lg:-translate-y-2.5'
							onClick={closeFsMenu}
							aria-label='Esfera'
						>
							<Logo className='w-full h-auto' />
						</Link>
					</MagneticButton>

					<nav className='hidden lg:block'>
						<ul className='flex items-center justify-center gap-8'>
							{[
								{
									label: 'Sobre',
									href: pages.about
								},
								{
									label: 'Serviços',
									href: pages.services
								},
								{
									label: 'Portfólio',
									href: pages.portfolio
								},
								{
									label: 'Contato',
									href: pages.contact
								}
							].map((item, i) => (
								<li key={i}>
									<MagneticButton strength={20}>
										<Link
											href={item.href}
											className={clsx(
												'hover-underline text-20 font-normal',
												isActiveRoute(item.href) ? 'text-yellow' : pathname === pages.contact ? 'text-black' : 'text-white'
											)}
										>
											{item.label}
										</Link>
									</MagneticButton>
								</li>
							))}
						</ul>
					</nav>

					<ul
						className='sm:flex sm:items-center sm:gap-2'
						data-top-menu-social
					>

						{socialLinks.map((item, i) => (
							<li
								key={i}
								className='hidden sm:block'
							>
								<MagneticButton>
									<Link
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										className={clsx(
											'flex items-center justify-center w-12 min-w-12 h-12 border border-current rounded-full transition-colors duration-200 hover:text-black hover:bg-yellow hover:border-yellow p-4',
											pathname === pages.contact ? 'text-black' : 'text-white'
										)}
										aria-label={item.name}
									>
										<item.icon className='w-full h-full' />
									</Link>
								</MagneticButton>
							</li>
						))}

						<li className='hidden sm:block lg:hidden'>
							<div
								className={clsx(
									'w-10 h-px block mx-2',
									pathname === pages.contact ? 'bg-black' : 'bg-white'
								)}
								data-top-menu-divider
							/>
						</li>

						<li className='lg:hidden'>
							<MagneticButton>
								<button
									className={clsx(
										'w-14 sm:w-12 min-w-14 sm:min-w-12 h-14 sm:h-12 rounded-full border border-current hover:border-yellow hover:bg-yellow hover:text-black flex flex-col items-center justify-center gap-1 relative transition-colors duration-200 cursor-pointer px-3 group',
										pathname === pages.contact ? 'text-black' : 'text-white'
									)}
									type='button'
									onClick={toggleFsMenu}
									data-top-menu-button
									aria-label='Menu'
								>

									{Array.from({ length: 2 }).map((_, i) => (
										<span
											key={i}
											className='block w-full h-px bg-current group-hover:bg-black transition-colors duration-200'
											data-top-menu-button-lines
										/>
									))}

									<span
										className='absolute inset-0 w-full h-full opacity-0'
										data-top-menu-button-lines-close
									>

										<span className='absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rotate-45 h-px bg-current group-hover:bg-black transition-colors duration-200' />

										<span className='absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 -rotate-45 h-px bg-current group-hover:bg-black transition-colors duration-200' />

									</span>

								</button>
							</MagneticButton>
						</li>

					</ul>

				</div>
			</div>
		)
	}

	return (
		<div ref={headerRef}>

			<section
				className='fixed top-0 left-0 w-full z-100 py-6 sm:py-10 -translate-y-[105%] [&.scrolling-up]:translate-y-0! transition-transform duration-600 bg-transparent'
				data-sticky-menu
			>

				<div
					className={clsx(
						'bg-linear-180 to-transparent absolute inset-0 z-0',
						pathname === pages.contact ? 'from-white/90' : 'from-black/90'
					)}
					data-sticky-menu-bg
				/>

				{topMenu()}

			</section>

			<section className='absolute z-99 top-6 sm:top-10 left-0 w-full'>
				{topMenu()}
			</section>

			<section
				className='fixed z-98 top-0 left-0 w-full pointer-events-none'
				data-fs-menu
			>
				<div className='base-container'>
					<div className='flex flex-col gap-10 justify-between min-h-dvh pt-30 pb-10'>
						
						<ul
							className='flex flex-col gap-1'
							data-fs-menu-list
						>
							{[
								{
									label: 'Início',
									href: pages.home
								},
								{
									label: 'Sobre',
									href: pages.about
								},
								{
									label: 'Serviços',
									href: pages.services
								},
								{
									label: 'Portfólio',
									href: pages.portfolio
								},
								{
									label: 'Contato',
									href: pages.contact
								}
							].map((item, i) => (
								<li
									key={i}
									className='relative translate-y-[150%] opacity-0'
								>
									<Link
										href={item.href}
										className={clsx(
											'font-heading font-semibold uppercase text-6xl leading-[.9]',
											isActiveRoute(item.href) ? 'text-yellow' : 'text-gray-dark'
										)}
										onClick={closeFsMenu}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>

						<div
							className='opacity-0'
							data-fs-menu-contact
						>

							<p className='block text-gray-light text-sm'>
								endereço
							</p>

							<Link
								href={contact.gmaps}
								target='_blank'
								rel='noopener noreferrer'
								className='block w-fit mt-2 mb-4 text-sm text-gray-dark'
							>
								Av. Rep. Argentina, 1228 <br />
								Vila Izabel, Curitiba - PR, 80610-260
							</Link>

							<ul className='flex items-center gap-2'>
								{socialLinks.map((item, i) => (
									<li key={i}>
										<Link
											href={item.href}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center justify-center w-12 min-w-12 h-12 border border-current text-gray-light rounded-full transition-colors duration-200 hover:text-black hover:bg-yellow hover:border-yellow p-4'
											aria-label={item.name}
										>
											<item.icon className='w-full h-full' />
										</Link>
									</li>
								))}
							</ul>

						</div>

					</div>
				</div>
			</section>
			
			<aside
				className='fixed z-97 inset-0 pointer-events-none'
				data-fs-menu-bg
			>
				<div className='absolute z-1 top-0 left-0 w-full h-[110vh] translate-y-full bg-yellow' />
				<div className='absolute z-2 top-0 left-0 w-full h-[110vh] translate-y-full bg-black' />
				<div className='absolute z-3 top-0 left-0 w-full h-[110vh] translate-y-full bg-white' />
			</aside>

		</div>
	)
}