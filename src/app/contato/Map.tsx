'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Map() {

	const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!sectionRef.current) return

        gsap.from('.iframe', {
            clipPath: 'inset(75% 75% 75% 75%)',
            scrollTrigger: {
                scroller: document.getElementById('viewport') as HTMLElement,
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        })
    }, {
        scope: sectionRef
    })

	return (
		<section
            className='bg-black w-full overflow-hidden py-8 sm:py-10 md:py-15'
            ref={sectionRef}
        >
            <div className='base-container'>
                <div className='iframe relative overflow-hidden w-full h-[60svh] grayscale-100 rounded-sm sm:rounded-md md:rounded-lg bg-gray-200'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.4275057544082!2d-49.291549324002624!3d-25.457396677544395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce385f11942c7%3A0x2bb39b9ff1afef0f!2sAg%C3%AAncia%20Esfera!5e0!3m2!1spt-BR!2sbr!4v1764455520806!5m2!1spt-BR!2sbr'
                        width='600'
                        height='450'
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        className='w-full h-full border-none!'
                    />
                </div>
            </div>
        </section>
    )
}