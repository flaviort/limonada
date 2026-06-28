'use client'

// libraries
import { Link } from 'next-transition-router'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LemonTrail from '@/components/Utils/Animations/LemonTrail'
import Logo from '@/components/Svg/Logo'

// utils
import { pages, social } from '@/utils/routes'
import { getYear } from '@/utils/functions'

export default function Footer() {

	const pathname = usePathname()
	const year = getYear(new Date().getFullYear().toString())

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
		<LemonTrail
			as='footer'
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
		</LemonTrail>
	)
}