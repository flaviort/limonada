'use client'

// linraries
import { TransitionRouter, useTransitionState } from 'next-transition-router'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
    children: React.ReactNode
}

// refresh scrolltrigger when page is ready
function ScrollTriggerRefresher() {
    const { isReady, stage } = useTransitionState()
    const hasRefreshedRef = useRef(false)

    useEffect(() => {
        // only refresh once when page transition is complete and page is ready
        if (isReady && stage === 'none' && !hasRefreshedRef.current) {
            hasRefreshedRef.current = true
            
            // wait one frame to ensure all components have mounted
            requestAnimationFrame(() => {
                const triggers = ScrollTrigger.getAll()
                //console.log('ScrollTrigger instances:', triggers.length, triggers)
                
                // force refresh all instances once
                ScrollTrigger.refresh(true)
            })
        }
        
        // reset flag when entering a new page
        if (stage === 'entering') {
            hasRefreshedRef.current = false
        }
    }, [isReady, stage])

    return null
}

export default function PageTransition({
    children
}: Props) {

    const leaveAnimation = async () => {
        return new Promise((resolve) => {
            
            const allScrollTriggers = ScrollTrigger.getAll()

            const tl = gsap.timeline({
                onComplete: resolve
            })

            tl.to('[data-page-transition] > div', {
                yPercent: -100,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.inOut',
                onComplete: () => {
                    // kill all ScrollTrigger instances from the current page before leaving
                    //console.log('Killing ScrollTrigger instances on leave:', allScrollTriggers.length)
                    allScrollTriggers.forEach((st) => {
                        st.kill()
                    })
                }
            })
        })
    }

    const enterAnimation = async () => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: resolve
            })

            tl.to('[data-page-transition] > div', {
                yPercent: -200,
                duration: 1,
                stagger: {
                    amount: 0.5,
                    from: 'end'
                },
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set('[data-page-transition]', { clearProps: 'all' })
                    gsap.set('[data-page-transition] > div', { clearProps: 'all' })
                }
            })

        })
    }

    return (
        <TransitionRouter
            leave={async (next) => {
                await leaveAnimation()
                next()
            }}
            enter={async (next) => {
                await enterAnimation()
                next()
            }}
        >

            {children}

            <ScrollTriggerRefresher />

            <aside
                className='fixed z-999999 inset-0 pointer-events-none'
                data-page-transition
            >
                <div className='absolute z-1 top-0 left-0 w-full h-lvh translate-y-full bg-black' />
                <div className='absolute z-2 top-0 left-0 w-full h-lvh translate-y-full bg-white' />
                <div className='absolute z-3 top-0 left-0 w-full h-lvh translate-y-full bg-yellow' />
            </aside>

        </TransitionRouter>
    )
}