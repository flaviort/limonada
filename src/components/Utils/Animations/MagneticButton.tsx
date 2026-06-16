'use client'

// libraries
import clsx from 'clsx'
import { useRef, useEffect } from 'react'
import { gsap, Power4, Elastic } from 'gsap/dist/gsap'

// types
interface MagneticButtonProps {
    className?: string
    children: React.ReactNode
    strength?: number
}

export default function MagneticButton({
    className,
    children,
    strength = 30
}: MagneticButtonProps) {
    
    const buttonRef = useRef<HTMLDivElement>(null)
    const boundingRef = useRef<DOMRect | null>(null)
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const magnetButton = buttonRef.current
        if (!magnetButton) return

        // Cache bounding rect and update only when needed
        const updateBounding = () => {
            boundingRef.current = magnetButton.getBoundingClientRect()
        }

        // Throttled bounding rect update using RAF
        const throttledUpdateBounding = () => {
            if (rafRef.current) return
            rafRef.current = requestAnimationFrame(() => {
                updateBounding()
                rafRef.current = null
            })
        }

        // Check if desktop
        const isDesktop = window.innerWidth > 540
        if (!isDesktop) return

        // Initial bounding rect
        updateBounding()

        function moveMagnet(event: MouseEvent) {
            const bounding = boundingRef.current
            if (!bounding || !magnetButton) return

            gsap.to(magnetButton, {
                x: (((event.clientX - bounding.left) / bounding.width) - 0.5) * strength,
                y: (((event.clientY - bounding.top) / bounding.height) - 0.5) * strength,
                rotate: '0.001deg',
                ease: Power4.easeOut,
                duration: 1.5
            })
        }

        function handleMouseLeave(event: MouseEvent) {
            gsap.to(event.currentTarget, {
                x: 0,
                y: 0,
                ease: Elastic.easeOut,
                duration: 1.5
            })
        }

        // Update bounding rect on scroll and resize (throttled)
        const handleResize = () => throttledUpdateBounding()
        const handleScroll = () => throttledUpdateBounding()

        // Get the viewport scroll container
        const viewport = document.getElementById('viewport')

        // Add event listeners
        magnetButton.addEventListener('mousemove', moveMagnet)
        magnetButton.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', handleResize, { passive: true })
        
        // Listen to scroll on #viewport instead of window
        if (viewport) {
            viewport.addEventListener('scroll', handleScroll, { passive: true })
        }

        // Cleanup
        return () => {
            if (magnetButton) {
                magnetButton.removeEventListener('mousemove', moveMagnet)
                magnetButton.removeEventListener('mouseleave', handleMouseLeave)
            }
            window.removeEventListener('resize', handleResize)
            if (viewport) {
                viewport.removeEventListener('scroll', handleScroll)
            }
            
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [strength])

    return (
        <div
            ref={buttonRef}
            className={clsx('w-fit', className)}
            data-magnetic
        >
            {children}
        </div>
    )
}