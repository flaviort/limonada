'use client'

// libraries
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

// components
import Section from './Section'
import Video from '@/components/Video'
import FollowMouse from '@/components/Utils/Animations/FollowMouse'

interface Props {
    media: {
        image?: string
        video?: string
        alt?: string
    }[]
}

export default function StoriesSlider({
    media
}: Props) {

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
    }, [media])

    return (
        <Section>
            <FollowMouse text='Arraste'>
                <div className='base-container'>
                    <Swiper
                        modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
                        allowTouchMove={true}
                        slidesPerView={'auto'}
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
                                spaceBetween: 25
                            },
                            768: {
                                spaceBetween: 40
                            },
                            1201: {
                                spaceBetween: 50
                            }
                        }}
                        className='overflow-visible!'
                    >
                        {media.map((item, i) => (
                            <SwiperSlide
                                key={i}
                                className='w-auto!'
                            >
                                <Media
                                    image={item.image}
                                    video={item.video}
                                    alt={item.alt || ''}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </FollowMouse>
        </Section>
    )
}

interface MediaProps {
    image?: string
    video?: string
    alt?: string
}

export const Media = ({
    image,
    video,
    alt
}: MediaProps) => {
    return (
        <div className='relative overflow-hidden block w-[calc(100vw/1.2)] sm:w-[calc(100vw/1.5)] md:w-[calc(100vw/2.5)] lg:w-[calc(100vw/3.5)] h-auto aspect-9/14 rounded-md bg-black'>

            {image && (
                <Image
                    src={image}
                    alt={alt || ''}
                    fill
                    className='cover'
                    loading='lazy'
                    sizes='(max-width: 1200px) 100vw, 50vw'
                />
            )}

            {video && (
                <Video
                    video={video}
                    className='cover'
                />
            )}

        </div>
    )
}