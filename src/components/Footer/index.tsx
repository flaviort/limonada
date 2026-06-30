'use client'

// libraries
import { useRef } from 'react'
import { Link } from 'next-transition-router'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LemonTrail from '@/components/Utils/Animations/LemonTrail'
import Logo from '@/components/Svg/Logo'
import { Form, Input, InputHidden, Submit } from '@/components/Form'

// utils
import { pages, social } from '@/utils/routes'
import { getYear } from '@/utils/functions'


export default function Footer() {

	const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from('[data-logo] path', {
				scale: 3,
				filter: 'blur(.5rem)',
				opacity: 0,
				rotation: -50,
				stagger: .1,
                scrollTrigger: {
                    anticipatePin: 1,
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: sectionRef.current,
                    start: '40% 100%',
                    end: '80% 100%',
                    scrub: 2,
					//markers: true
                }
            })
        }
    }, {
        scope: sectionRef
    })

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
			className='bg-green-dark rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-4xl sm:rounded-tr-4xl md:rounded-tl-[3rem] md:rounded-tr-[3rem] -mt-4 sm:-mt-8 md:mt-0 relative overflow-hidden z-10 text-green-light'
			data-main-footer
			ref={sectionRef}
		>
			<LemonTrail className='relative w-full touch-pan-y pointer-events-auto'>
				<div className='base-container'>
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
												className='hover-underline md:text-lg'
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
												className='hover-underline md:text-lg'
												onClick={(e) => handleLinkClick(e, item.href)}
											>
												{item.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<div className='col-md-4'>

								<p className='md:text-lg'>
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
										isLight
									/>

									<MagneticButton className='max-sm:w-full'>
										<Submit
											text='Enviar'
											className='max-sm:w-full! md:-ml-1'
										/>
									</MagneticButton>
									
								</Form>

							</div>

						</div>

						<div className='flex flex-col gap-4 md:gap-6'>

							<Logo className='w-full h-auto text-green-light overflow-visible' />

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