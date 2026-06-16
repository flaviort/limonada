'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface Props {
    children: React.ReactNode
    text: string
    scrollTrigger?: boolean
}

export default function FollowMouse({
    children,
    text,
    scrollTrigger
}: Props) {

    const section = useRef<HTMLDivElement>(null)
    const object = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const parent = section.current
        const item = object.current

        if (!parent || !item) return

        const viewport = document.getElementById('viewport')
        if (!viewport) return

        // Set initial position and transform origin
        gsap.set(item, {
            xPercent: -50,
            yPercent: -50,
            left: 0,
            top: 0,
            scale: 0,
            opacity: 0
        })

        let isDragging = false
        let isMouseOver = false
        let scrollTimeout: NodeJS.Timeout | null = null

        function moveCircle(e: MouseEvent | WheelEvent | PointerEvent) {
            if (!item) return

            const x = e.clientX
            const y = e.clientY

            gsap.to(item, {
                x: x,
                y: y,
                ease: 'power2.out',
                duration: .6
            })
        }

        // Handle mouse move during drag (on document level)
        const handleDocumentMouseMove = (e: MouseEvent) => {
            if (isDragging && item) {
                moveCircle(e)
            }
        }

        // Handle pointer move during drag (on document level)
        const handleDocumentPointerMove = (e: PointerEvent) => {
            if (isDragging && item) {
                moveCircle(e)
            }
        }

        const handleMouseDown = () => {
            isDragging = true
            // Ensure circle is visible when dragging starts
            if (item) {
                gsap.to(item, {
                    scale: 1,
                    opacity: 1,
                    duration: .3,
                    ease: 'circ.out'
                })
            }
        }

        const handleMouseUp = () => {
            isDragging = false
            // Hide circle if mouse is not over the element
            if (!isMouseOver && item) {
                gsap.to(item, {
                    scale: 0,
                    opacity: 0,
                    duration: .5,
                    ease: 'circ.out'
                })
            }
        }

        const handleMouseEnter = () => {
            isMouseOver = true
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
            setTimeout(() => {
                if (!item) return
                gsap.to(item, {
                    scale: 1,
                    opacity: 1,
                    duration: .5,
                    ease: 'circ.out'
                })
            }, 100)
        }

        const handleLeave = () => {
            // Only hide if not dragging (to keep circle visible during drag)
            if (!isDragging) {
                isMouseOver = false
                if (!item) return
                gsap.to(item, {
                    scale: 0,
                    opacity: 0,
                    duration: .5,
                    ease: 'circ.out'
                })
            }
        }

        const handleScroll = () => {
            // Only hide on scroll if mouse is not over the element and not dragging
            // Use debounce to avoid hiding during smooth scroll
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
            
            scrollTimeout = setTimeout(() => {
                if (!isMouseOver && !isDragging && item) {
                    gsap.to(item, {
                        scale: 0,
                        opacity: 0,
                        duration: .5,
                        ease: 'circ.out'
                    })
                }
            }, 150)
        }

        parent.addEventListener('mousemove', moveCircle)
        parent.addEventListener('wheel', moveCircle)
        parent.addEventListener('mousedown', handleMouseDown)
        parent.addEventListener('mouseenter', handleMouseEnter)
        parent.addEventListener('mouseleave', handleLeave)
        
        // Add document-level listeners for drag tracking
        document.addEventListener('mousemove', handleDocumentMouseMove)
        document.addEventListener('pointermove', handleDocumentPointerMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('pointerup', handleMouseUp)
        
        viewport.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
            parent.removeEventListener('mousemove', moveCircle)
            parent.removeEventListener('wheel', moveCircle)
            parent.removeEventListener('mousedown', handleMouseDown)
            parent.removeEventListener('mouseenter', handleMouseEnter)
            parent.removeEventListener('mouseleave', handleLeave)
            
            document.removeEventListener('mousemove', handleDocumentMouseMove)
            document.removeEventListener('pointermove', handleDocumentPointerMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('pointerup', handleMouseUp)
            
            viewport.removeEventListener('scroll', handleScroll)
        }
    }, {
        scope: section,
        dependencies: [scrollTrigger]
    })

    return (
        <div
            className='relative z-8 overflow-hidden block w-full h-full cursor-grab'
            style={{ clipPath: 'inset(-10% -10% -10% -10%)' }}
            ref={section}
        >

            <div
                className='fixed z-2 flex items-center justify-center w-35 min-w-35 h-35 rounded-full bg-yellow/90 x text-black pointer-events-none transform scale-0 max-md:hidden font-heading uppercase text-xl font-semibold'
                ref={object}
            >
                {text}
            </div>

            <div className='relative z-0 block w-full h-full'>
                {children}
            </div>

        </div>
    )
}
