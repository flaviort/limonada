'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
    text: React.ReactNode
}

export default function AnimatedText({
    text
}: Props) {

    const item = useRef<HTMLSpanElement>(null)
    const animRef = useRef<gsap.core.Tween | null>(null)
    const splitRef = useRef<SplitText | null>(null)

    useGSAP(() => {
        if (!item.current) return

        const initAnimation = async () => {
            if (animRef.current) {
                animRef.current.progress(1).kill()
            }
            if (splitRef.current) {
                splitRef.current.revert()
            }

            // Wait for fonts to load before initializing SplitText
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready
            }

            if (!item.current) return

            splitRef.current = new SplitText(item.current, { 
                type: 'lines, words, chars',
                linesClass: 'split-line'
            })

            if (!item.current) return

            animRef.current = gsap.from(splitRef.current.chars, {
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: item.current,
                    toggleActions: 'restart pause resume reverse',
                    start: 'top 85%'
                },
                duration: 0.5, 
                ease: 'circ.out', 
                y: '110%', 
                stagger: 0.01,
                onComplete: () => {
                    if (item.current) {
                        item.current.classList.add('completed')
                    }
                },
                onReverseComplete: () => {
                    if (item.current) {
                        item.current.classList.remove('completed')
                    }
                }
            })
        }

        initAnimation()

        return () => {
            if (animRef.current) {
                animRef.current.kill()
            }
            if (splitRef.current) {
                splitRef.current.revert()
            }
            if (item.current) {
                item.current.classList.remove('completed')
            }
        }
    }, { scope: item })

    return (
        <span
            className='reveal-text'
            ref={item}
			dangerouslySetInnerHTML={{ __html: typeof text === 'string' ? text : '' }}
        />
    )
}