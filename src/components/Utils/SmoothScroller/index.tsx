'use client'

// libraries
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
    children: React.ReactNode
}

export default function SmoothScroller({
    children
}: Props) {
    const viewportRef = useRef<HTMLDivElement>(null)
    const smoothScrollStateRef = useRef<{
        currentScroll: number
        targetScroll: number
        isScrolling: boolean
        rafId: number | null
    } | null>(null)
    const pathname = usePathname()

    // scroll to top on route change
    useEffect(() => {
        const viewport = viewportRef.current
        if (!viewport) return

        // reset smooth scroll state if it exists
        if (smoothScrollStateRef.current) {
            smoothScrollStateRef.current.currentScroll = 0
            smoothScrollStateRef.current.targetScroll = 0
            smoothScrollStateRef.current.isScrolling = false
            if (smoothScrollStateRef.current.rafId !== null) {
                cancelAnimationFrame(smoothScrollStateRef.current.rafId)
                smoothScrollStateRef.current.rafId = null
            }
        }

        // scroll to top immediately when route changes
        viewport.scrollTop = 0

    }, [pathname])

    useEffect(() => {
        const viewport = viewportRef.current
        if (!viewport) return

        // only enable smooth scroll on desktop (not mobile for better performance)
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        
        ScrollTrigger.config({ ignoreMobileResize: true })

        if (isMobile) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh(true)
            }, 1000)

            return () => {
                clearTimeout(timer)
            }
        }

        // desktop smooth scroll using requestAnimationFrame with lerp
        const state = {
            currentScroll: viewport.scrollTop,
            targetScroll: viewport.scrollTop,
            isScrolling: false,
            rafId: null as number | null
        }
        smoothScrollStateRef.current = state

        // lerp function for smooth interpolation
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const smoothScroll = () => {
            // calculate difference
            const diff = state.targetScroll - state.currentScroll
            
            // if difference is very small, snap to target
            if (Math.abs(diff) < 0.5) {
                state.currentScroll = state.targetScroll
                viewport.scrollTop = state.currentScroll
                state.isScrolling = false
                state.rafId = null
                return
            }

            // lerp towards target (0.1 = faster, 0.05 = slower but smoother)
            state.currentScroll = lerp(state.currentScroll, state.targetScroll, 0.075)
            viewport.scrollTop = state.currentScroll

            state.rafId = requestAnimationFrame(smoothScroll)
        }

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            
            // update target scroll position
            state.targetScroll += e.deltaY
            state.targetScroll = Math.max(0, Math.min(state.targetScroll, viewport.scrollHeight - viewport.clientHeight))

            // start smooth scroll animation if not already running
            if (!state.isScrolling) {
                state.isScrolling = true
                smoothScroll()
            }
        }

        // handle programmatic scrolling (like anchor links)
        const handleScroll = () => {
            // if scroll happened without wheel (programmatic), sync immediately
            if (!state.isScrolling) {
                state.currentScroll = viewport.scrollTop
                state.targetScroll = viewport.scrollTop
            }
        }

        viewport.addEventListener('wheel', handleWheel, { passive: false })
        viewport.addEventListener('scroll', handleScroll, { passive: true })

        // refresh scrollTrigger after setup
        const timer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 1000)

        return () => {
            viewport.removeEventListener('wheel', handleWheel)
            viewport.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
            if (state.rafId !== null) {
                cancelAnimationFrame(state.rafId)
            }
            smoothScrollStateRef.current = null
        }
    }, [])
  
    return (
        <div id='viewport' ref={viewportRef}>
            <div id='main-content'>
                {children}
            </div>
        </div>
    )
}