'use client'

// libraries
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

// interface
interface Props {
    children: React.ReactNode
    animateOnScroll?: boolean
    delay?: number
    blockColor?: string
    stagger?: number
    duration?: number
    className?: string
}

export default function TextReveal({
    children,
    animateOnScroll = true,
    delay = 0,
    blockColor = 'var(--color-yellow)',
    stagger = 0.15,
    duration = 0.75,
    className
}: Props) {

    const containerRef = useRef<HTMLDivElement>(null)
    const splitRefs = useRef<SplitText[]>([])
    const lines = useRef<HTMLElement[]>([])
    const blocks = useRef<HTMLElement[]>([])

    useGSAP(() => {
        if (!containerRef.current) return

        const initAnimation = async () => {
            // Wait for fonts to load before initializing SplitText
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready
            }

            if (!containerRef.current) return

            splitRefs.current = []
            lines.current = []
            blocks.current = []

            let elements = []

            if (containerRef.current.hasAttribute('data-copy-wrapper')) {
                elements = Array.from(containerRef.current.children)
            } else {
                elements = [containerRef.current]
            }

            elements.forEach((element) => {
                const split = SplitText.create(element, {
                    type: 'lines'
                })

                splitRefs.current.push(split)

                split.lines.forEach((line) => {
                    const wrapper = document.createElement('span')
                    wrapper.className = 'block-line-wrapper'
                    line.parentNode?.insertBefore(wrapper, line)
                    wrapper.appendChild(line)

                    const block = document.createElement('span')
                    block.className = 'block-revealer'
                    block.style.backgroundColor = blockColor
                    wrapper.appendChild(block)

                    lines.current.push(line as HTMLElement)
                    blocks.current.push(block)
                })

            })

            gsap.set(lines.current, {
                opacity: 0
            })

            gsap.set(blocks.current, {
                scaleX: 0,
                transformOrigin: 'left center'
            })

            const createBlockRevealAnimation = (block: HTMLElement, line: HTMLElement, i: number) => {
                const tl = gsap.timeline({
                    delay: delay + i * stagger,
                })

                tl.to(block, {
                    scaleX: 1,
                    duration: duration,
                    ease: 'power4.inOut'
                })

                tl.set(line, {
                    opacity: 1
                })

                tl.set(block, {
                    transformOrigin: 'right center'
                })

                tl.to(block, {
                    scaleX: 0,
                    duration: duration,
                    ease: 'power4.inOut'
                })

                return tl
            }

            if (animateOnScroll) {
                blocks.current.forEach((block, i) => {
                    const tl = createBlockRevealAnimation(block, lines.current[i], i)
                    tl.pause()

                    ScrollTrigger.create({
                        scroller: document.getElementById('viewport') as HTMLElement,
                        trigger: containerRef.current,
                        start: 'top 90%',
                        once: true,
                        onEnter: () => tl.play()
                    })
                })
            } else {
                blocks.current.forEach((block, i) => {
                    createBlockRevealAnimation(block, lines.current[i], i)
                })
            }
        }

        initAnimation()

        return () => {
            splitRefs.current.forEach((split) => split?.revert())

            const wrappers = containerRef.current?.querySelectorAll('.block-line-wrapper')

            wrappers?.forEach((wrapper) => {
                if (wrapper.parentNode && wrapper.firstChild) {
                    wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper)
                    wrapper.remove()
                }
            })
        }

    }, {
        scope: containerRef,
        dependencies: [animateOnScroll, delay, blockColor, stagger, duration]
    })

    return (
        <div
            ref={containerRef}
            data-copy-wrapper='true'
            className={className}
        >
            {children}
        </div>
    )
}