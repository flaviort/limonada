'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
    video: string
    className?: string
}

export default function Video({
    video,
    className
}: Props) {
    
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    const safePlay = async (videoElement: HTMLVideoElement) => {
        try {
            await videoElement.play()
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                console.warn('Video play error:', error)
            }
        }
    }

    useGSAP(() => {
        if (!videoWrapperRef.current || !videoRef.current) return

        const videoElement = videoRef.current

        scrollTriggerRef.current = ScrollTrigger.create({
            scroller: document.getElementById('viewport'),
            trigger: videoWrapperRef.current,
            start: '0% 120%',
            end: '100% -20%',
            onEnter: () => safePlay(videoElement),
            onEnterBack: () => safePlay(videoElement),
            onLeave: () => videoElement.pause(),
            onLeaveBack: () => videoElement.pause()
        })

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill()
                scrollTriggerRef.current = null
            }
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }
    }, {
        scope: videoWrapperRef
    })

    return (
        <div ref={videoWrapperRef} className={className}>
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                className='w-full h-full object-cover'
            >
                <source
                    src={video}
                    type='video/mp4'
                />
            </video>
        </div>
    )
}