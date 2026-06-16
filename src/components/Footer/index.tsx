'use client'

// libraries
import { Link } from 'next-transition-router'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// utils
import { contact, pages, socialLinks } from '@/utils/routes'
import { email, getYear, phone } from '@/utils/functions'

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
		<footer
			className='pb-8 sm:pb-10 pt-14 sm:pt-17 bg-white'
			data-main-footer
		>
			<div className='base-container relative'>

				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>

					<ul className='flex flex-col xs:flex-row xs:flex-wrap sm:flex-nowrap xs:gap-5 sm:gap-6'>

						<li className='w-full sm:w-fit mb-4 xs:mb-0'>
							<MagneticButton>
								<Link
									href={pages.home}
									className='w-12 min-w-12 h-12 flex transition-opacity duration-200 hover:opacity-70'
									onClick={(e) => handleLinkClick(e, pages.home)}
								>
									<Image
										src='/img/svg/logo/icon-black.svg'
										alt='Esfera'
										width={65}
										height={65}
										loading='lazy'
										className='w-full h-full'
									/>
								</Link>
							</MagneticButton>
						</li>

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
								<MagneticButton>
									<Link
										href={item.href}
										className='hover-underline text-36 font-heading font-semibold uppercase max-xs:text-5xl!'
										onClick={(e) => handleLinkClick(e, item.href)}
									>
										{item.label}
									</Link>
								</MagneticButton>
							</li>
						))}

					</ul>

					<div className='bottom-0 right-0 absolute lg:bottom-auto lg:right-auto lg:relative'>
						<MagneticButton>
							<Link
								href='https://greencarbonzero.com/'
								target='_blank'
								rel='noopener noreferrer'
								className='flex w-16 h-auto transition-all duration-200 md:grayscale-100 hover:md:grayscale-0 md:opacity-70 hover:md:opacity-100'
							>
								<Image
									src='/img/svg/green-carbon.svg'
									alt='Green Carbon by NDD'
									width={340}
									height={460}
									loading='lazy'
									className='w-full h-auto'
								/>
							</Link>
						</MagneticButton>
					</div>

				</div>

				<div className='flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-4 mt-10 lg:mt-20'>

					<div className='flex flex-col gap-8'>

						<div className='flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-7'>

							<ul className='flex gap-2 lg:gap-3'>
								{socialLinks.map((item, i) => (
									<li key={i}>
										<MagneticButton>
											<Link
												href={item.href}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center justify-center w-12 lg:w-15 min-w-12 lg:min-w-15 h-12 lg:h-15 border border-gray-light text-gray-light rounded-full transition-colors duration-200 hover:text-white hover:bg-gray-medium hover:border-gray-medium p-4 lg:p-5'
												aria-label={item.name}
											>
												<item.icon className='w-full h-full' />
											</Link>
										</MagneticButton>
									</li>
								))}
							</ul>

							<p className='text-gray-light'>
								Agência Esfera © {year} <br />
								Todos os direitos reservados
							</p>

						</div>

						<MagneticButton>
							<Link
								href={pages.privacy}
								className='hover-underline text-gray-light'
							>
								Política de Privacidade
							</Link>
						</MagneticButton>

					</div>

					<div className='flex flex-col lg:items-end lg:text-right'>

						<MagneticButton>
							<Link
								href={email(contact.email)}
								className='hover-underline-white text-24 max-xs:text-[4.5vw]!'
							>
								{contact.email}
							</Link>
						</MagneticButton>
						
						<MagneticButton className='mt-8 mb-4'>
							<Link
								href={phone(contact.phone)}
								className='hover-underline text-gray-light text-20'
							>
								{contact.phone}
							</Link>
						</MagneticButton>

						<MagneticButton>
							<Link
								href={contact.gmaps}
								target='_blank'
								rel='noopener noreferrer'
								className='text-18 transition-opacity duration-200 hover:opacity-70'
							>
								<b className='font-semibold'>Av. Rep. Argentina, 1228 - Sala 2210</b> <br />
								Vila Izabel, Curitiba - PR, 80610-260
							</Link>
						</MagneticButton>

					</div>

				</div>

			</div>
		</footer>
	)
}