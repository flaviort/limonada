'use client'

// libraries
import { useRef } from 'react'
import { Link } from 'next-transition-router'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

gsap.registerPlugin(ScrollTrigger, SplitText)

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// utils
import { pages } from '@/utils/routes'

export default function Intro() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    const handleSlideChange = (swiper: any) => {
        const allSlides = swiper.slides

        // animate all non-active slides out
        allSlides.forEach((slide: any, index: number) => {
            if (index !== swiper.activeIndex) {
                const texts = slide.querySelectorAll('.reveal-text')
                texts.forEach((text: Element) => {
                    text.classList.remove('completed')
                    const split = new SplitText(text, { 
                        type: 'lines, words, chars',
                        linesClass: 'split-line'
                    })
                    
                    gsap.to(split.chars, {
                        y: '-110%',
                        duration: 0.5,
                        ease: 'circ.in',
                        stagger: 0.01,
                        onComplete: () => split.revert()
                    })
                })
            }
        })

        // animate incoming slide
        const activeSlide = allSlides[swiper.activeIndex]
        if (activeSlide) {
            const texts = activeSlide.querySelectorAll('.reveal-text')

            texts.forEach((text: Element) => {
                text.classList.remove('completed')

                const split = new SplitText(text, { 
                    type: 'lines, words, chars',
                    linesClass: 'split-line'
                })
                
                gsap.fromTo(split.chars,
                    {
                        y: '110%'
                    },
                    {
                        y: '0%',
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                        stagger: 0.02,
                        onComplete: () => {
                            text.classList.add('completed')
                            split.revert()
                        }
                    }
                )
            })
        }
    }

    useGSAP(() => {
        if (!videoRef.current || !targetRef.current || !videoContainerRef.current || !wrapperRef.current) return

        const videoContainer = videoContainerRef.current
        const target = targetRef.current
        const bgAnimation = gsap.timeline({ paused: true })

        const updateAnimation = () => {
            gsap.set(videoContainer, { clearProps: 'all' })
            
            const initialRect = videoContainer.getBoundingClientRect()
            const targetRect = target.getBoundingClientRect()
            const targetBorderRadius = window.getComputedStyle(target).borderRadius

            const scale = Math.min(
                targetRect.width / initialRect.width,
                targetRect.height / initialRect.height
            )

            const translateX = (targetRect.left + targetRect.width / 2) - (initialRect.left + initialRect.width / 2)
            const translateY = (targetRect.top + targetRect.height / 2) - (initialRect.top + initialRect.height / 2)

            bgAnimation.clear()
            bgAnimation.to(videoContainer, {
                x: translateX,
                y: translateY,
                scale,
                borderRadius: targetBorderRadius,
                ease: 'none',
                duration: 1
            }, 0)
        }

        updateAnimation()

        const bgScroll = ScrollTrigger.create({
            scroller: document.getElementById('viewport') as HTMLElement,
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=90%',
            scrub: true,
            animation: bgAnimation,
            onRefresh: updateAnimation
        })

        const infosAnimation = ScrollTrigger.create({
            scroller: document.getElementById('viewport') as HTMLElement,
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=20%',
            scrub: true,
            animation: gsap.to('.banner-texts', {
                opacity: 0
            })
        })

        return () => {
            bgScroll.kill()
            bgAnimation.kill()
            infosAnimation.kill()
            gsap.set(videoContainer, { clearProps: 'all' })
        }
    }, { scope: wrapperRef })

    return (
        <div ref={wrapperRef}>
            <section className='relative z-2'>

                <div 
                    ref={videoContainerRef}
                    className='absolute inset-0 w-full h-full overflow-hidden bg-black will-change-transform'
                >
                    <video
                        ref={videoRef}
                        loop
                        muted
                        playsInline
                        autoPlay
                        className='w-full h-full object-cover opacity-50'
                        id='video-step-1'
                    >
                        <source
                            src='/videos/intro-03.mp4'
                            type='video/mp4'
                        />
                    </video>
                </div>

                <div className='banner-texts base-container relative z-2'>
                    <div className='relative flex items-center justify-center text-center h-svh'>

                        <p className='text-24 text-white absolute z-4 bottom-10 left-0 leading-snug!'>
                            Somos uma <br />
                            <span className='text-yellow'>agência 360</span>
                        </p>

                        <button
                            onClick={() => {
                                const sobreElement = document.getElementById('sobre')
                                const viewport = document.getElementById('viewport')
                                
                                if (sobreElement && viewport) {
                                    const targetPosition = sobreElement.offsetTop
                                    
                                    gsap.to(viewport, {
                                        scrollTop: targetPosition,
                                        duration: 1.5,
                                        ease: 'power1.inOut'
                                    })
                                }
                            }}
                            className='absolute z-4 bottom-10 right-0 animated-scroll group'
                        >
                            <span className='animated-scroll-bar-wrapper'>
                                <span className='animated-scroll-bar' />
                            </span>

                            <span>
                                scroll
                            </span>

                        </button>

                        <Swiper
                            modules={[EffectFade, Autoplay]}
                            effect='fade'
                            fadeEffect={{
                                crossFade: true
                            }}
                            allowTouchMove={false}
                            preventClicks={true}
                            noSwiping={true}
                            loop
                            className='w-full text-white'
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            speed={400}
                            onSlideChangeTransitionStart={handleSlideChange}
                        >

                            <SwiperSlide>

                                <p className='reveal-text text-30 font-heading uppercase font-semibold'>
                                    Eventos corporativos para
                                </p>

                                <h2 className='reveal-text font-heading text-100 uppercase tracking-tighter font-semibold mt-2'>
                                    Impulsionar seu <span className='text-yellow'>sucesso</span>
                                </h2>

                            </SwiperSlide>

                            <SwiperSlide>

                                <h2 className='reveal-text font-heading text-100 uppercase tracking-tighter font-semibold mb-6'>
                                    Criatividade é <span className='text-yellow'>movimento</span>
                                </h2>

                                <p className='reveal-text text-30 font-heading uppercase font-semibold'>
                                    e por aqui a gente não para
                                </p>

                            </SwiperSlide>

                        </Swiper>

                    </div>
                </div>

            </section>

            <section
                id='sobre'
                className='bg-white py-15 sm:py-20 mg:py-25'
            >
                <div className='base-container'>
                    
                    <div className='row'>

                        <div className='col-lg-7 col-lg-push-5 lg:flex lg:items-stretch mb-10 sm:mb-12 lg:mb-0'>
                            <div 
                                ref={targetRef}
                                className='relative overflow-hidden w-full block rounded-lg sm:rounded-xl md:rounded-4xl lg:rounded-[40rem] h-[60vw] lg:h-auto'
                            ></div>
                        </div>

                        <div className='col-lg-5 col-lg-pull-7 lg:py-10'>
                            <TextReveal className='[&_.block-revealer]:h-[115%]!'>
                                <p className='text-60 text-center lg:text-left'>
                                    Na <Link href={pages.about} className='relative font-semibold before:content-[""] before:absolute before:bottom-3 before:left-0 before:w-full before:h-1 before:bg-yellow before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100'>Esfera</Link>, trabalhamos com energia, paixão e respeito.
                                </p>
                            </TextReveal>
                        </div>

                    </div>

                    <StaggerUp
                        className='flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-15 md:gap-25 lg:gap-5 xl:gap-10 2xl:gap-20 my-15 md:my-20 lg:my-25'
                        infinite
                    >
                        {[
                            {
                                sub: 'Prêmio Live 2021',
                                title: 'Ouro em Agência Regional <br />de Brand Experience'
                            },
                            {
                                sub: '20ª Mostra de <br />Comunicação do Agro ABMRA',
                                title: 'Ouro em Programa e <br />Campanha de Incentivo',
                                text: 'Case: Expo Latin America <br />2021 John Deere'
                            },
                            {
                                sub: 'Premio Caio 2024',
                                title: 'Ouro em evento promocional',
                                text: 'Case: M&T Expo 24 <br />John Deere & Wirtgen Group'
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className='relative flex flex-col items-center justify-center gap-1 text-center px-15 sm:px-25 lg:px-10 xl:px-14 2xl:px-16 lg:w-full'
                            >

                                <Image
                                    src='/img/svg/laurel-left.svg'
                                    alt='Lauréola'
                                    width={68}
                                    height={115}
                                    className='absolute top-1/2 -translate-y-1/2 left-0 z-0 w-15 sm:w-20 lg:w-12 xl:w-16 h-auto'
                                />

                                {item.sub && (
                                    <p
                                        className='text-sm uppercase tracking-tight text-gray-light leading-[1.2]'
                                        dangerouslySetInnerHTML={{ __html: item.sub }}
                                    />
                                )}

                                {item.title && (
                                    <h3
                                        className='text-18 uppercase tracking-tight font-semibold leading-[1.1]'
                                        dangerouslySetInnerHTML={{ __html: item.title }}
                                    />
                                )}

                                {item.text && (
                                    <p
                                        className='text-sm uppercase tracking-tight text-gray-medium font-medium leading-[1.2] px-4'
                                        dangerouslySetInnerHTML={{ __html: item.text }}
                                    />
                                )}

                                <Image
                                    src='/img/svg/laurel-right.svg'
                                    alt='Lauréola'
                                    width={68}
                                    height={115}
                                    className='absolute top-1/2 -translate-y-1/2 right-0 z-0 w-15 sm:w-20 lg:w-12 xl:w-16 h-auto'
                                />

                            </div>
                        ))}
                    </StaggerUp>

                    <div className='flex items-center justify-center gap-4'>

                        <div className='hidden lg:block w-2 h-2 min-w-2 rounded-full bg-yellow' />

                        <AnimatedTitle
                            className='font-heading uppercase text-30 font-bold text-gray-medium max-lg:text-4xl! text-center'
                            style='gray-black'
                        >
                            Grandes conquistas rendem uma coleção de memórias únicas
                        </AnimatedTitle>

                        <div className='hidden lg:block w-2 h-2 min-w-2 rounded-full bg-yellow' />

                    </div>

                </div>
            </section>
        </div>
    )
}