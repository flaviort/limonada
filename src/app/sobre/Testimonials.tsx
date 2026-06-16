'use client'

// libraries
import clsx from 'clsx'
import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import Image from 'next/image'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'

export default function Testimonials() {

    const scrollbarRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperType | null>(null)

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
    }

    // set scrollbar element and initialize
    useEffect(() => {
        if (swiperRef.current && scrollbarRef.current) {
            if (swiperRef.current.scrollbar) {
                swiperRef.current.scrollbar.el = scrollbarRef.current
                swiperRef.current.scrollbar.init()
                swiperRef.current.scrollbar.updateSize()
                swiperRef.current.update()
            }
        }
    }, [])

    const testimonials = [
        {
            //bgColor: '#35791E',
            logo: '/img/clients/corteva.png',
            logoAlt: 'Corteva',
            //image: '/img/portfolio/01-small.jpg',
            text: 'Nunca esqueceremos o dia em que a Esfera nos ajudou a realizar o nosso primeiro evento corporativo. Triplicamos o número de participantes comparado ao ano anterior e a qualidade do evento foi excelente.',
            person: 'Rodrigo B.',
            title: 'Sócio'
        },
        {
            bgColor: '#35791E',
            logo: '/img/clients/john-deere.png',
            logoAlt: 'John Deere',
            image: '/img/portfolio/02-small.jpg',
            text: 'A Esfera realizou um trabalho sensacional para a nossa empresa. Estamos muito satisfeitos com o resultado e com a equipe em geral.',
            person: 'Flávio R. T.',
            title: 'CEO'
        },
        {
            bgColor: '#0072CE',
            logo: '/img/clients/bosch.svg',
            logoAlt: 'Bosch',
            image: '/img/portfolio/03-small.jpg',
            text: 'Dedição, carinho e um zelo incomum são as palavras que me vêm à mente quando penso no trabalho da Esfera. Um evento completo, desde a ideia até a execução, com toda a dedicação e profissionalismo que só a Esfera pode oferecer.',
            person: 'Vanessa T.',
            title: 'Gerente de Marketing'
        },
        {
            bgColor: '#1D1D1B',
            logo: '/img/clients/corteva.png',
            logoAlt: 'Corteva',
            image: '/img/portfolio/01-small.jpg',
            text: 'Nunca esqueceremos o dia em que a Esfera nos ajudou a realizar o nosso primeiro evento corporativo. Triplicamos o número de participantes comparado ao ano anterior e a qualidade do evento foi excelente.',
            person: 'Rodrigo B.',
            title: 'Sócio'
        },
        {
            bgColor: '#0072CE',
            logo: '/img/clients/john-deere.png',
            logoAlt: 'John Deere',
            image: '/img/portfolio/02-small.jpg',
            text: 'A Esfera realizou um trabalho sensacional para a nossa empresa. Estamos muito satisfeitos com o resultado e com a equipe em geral.',
            person: 'Flávio R. T.',
            title: 'CEO'
        },
        {
            bgColor: '#1D1D1B',
            logo: '/img/clients/portos-do-parana.png',
            logoAlt: 'Portos do Paraná',
            image: '/img/portfolio/03-small.jpg',
            text: 'Dedição, carinho e um zelo incomum são as palavras que me vêm à mente quando penso no trabalho da Esfera. Um evento completo, desde a ideia até a execução, com toda a dedicação e profissionalismo que só a Esfera pode oferecer.',
            person: 'Vanessa T.',
            title: 'Gerente de Marketing'
        }
    ]

    return (
        <section className='py-15 sm:py-20 md:py-25 xl:py-30'>
            <div className='base-container'>
                <div className='block border-t border-t-gray-lightest pt-15'>

                    <TextReveal>
                        <h2 className='text-36'>
                            Afinal, reconhecimento <span className='text-yellow'>faz a diferença</span>
                        </h2>
                    </TextReveal>

                    <Swiper
                        modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
                        allowTouchMove={true}
                        slidesPerView={1.05}
                        spaceBetween={15}
                        freeMode={true}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        scrollbar={{
                            draggable: true
                        }}
                        simulateTouch
                        onSwiper={handleSwiper}
                        breakpoints={{
                            575: {
                                spaceBetween: 15,
                                slidesPerView: 1.1
                            },
                            992: {
                                spaceBetween: 25,
                                slidesPerView: 1.5
                            },
                            1400: {
                                spaceBetween: 30,
                                slidesPerView: 2
                            }
                        }}
                        className='overflow-visible! mt-6 sm:mt-8 lg:mt-10'
                    >
                        {testimonials.map((item, i) => (
                            <SwiperSlide
                                key={i}
                                className='h-auto!'
                            >
                                <div
                                    className={clsx(
                                        'relative overflow-hidden md:flex md:items-stretch w-full h-full rounded-md md:rounded-lg bg-black',
                                        item.image && 'md:flex-row-reverse'
                                    )}
                                    style={{ backgroundColor: item.bgColor }}
                                >

                                    {item.image && (
                                        <div className='relative overflow-hidden block h-[50vw] md:h-auto min-w-full md:min-w-[40%]'>
                                            <Image
                                                src={item.image}
                                                alt={item.logoAlt}
                                                fill
                                                className='cover'
                                                loading='lazy'
                                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw'
                                            />
                                        </div>
                                    )}

                                    <div className={clsx(
                                        'flex flex-col gap-4 text-white p-8 md:p-10 md:h-full md:justify-between',
                                        !item.image && 'md:w-140 md:max-w-full'
                                    )}>

                                        {item.logo && (
                                            <Image
                                                src={item.logo}
                                                alt={item.logoAlt}
                                                width={150}
                                                height={110}
                                                className='block w-40 h-auto object-contain brightness-0 invert'
                                            />
                                        )}

                                        <div className='flex flex-col gap-4 mt-5 md:mt-15 lg:mt-20'>

                                            <p>
                                                {item.text}
                                            </p>

                                            <p>
                                                <b>{item.person}</b><br />
                                                <span className='opacity-80'>
                                                    {item.title}
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                
                </div>
            </div>
        </section>
    )
}