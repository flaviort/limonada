// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Marquee from '@/components/Marquee'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// utils
import { logos } from '@/utils/logos'

export default function ClientsSlider() {
    return (
        <section className='py-15 lg:py-20 xl:py-25 bg-white'>
            
            <div className='base-container'>
                <div className='md:flex md:gap-4 md:justify-between'>

                    <AnimatedTitle
                        className='uppercase font-heading text-[31vw] sm:text-[33vw] md:text-[18vw] tracking-tighter leading-none text-yellow whitespace-nowrap -ml-2 md:ml-0 pr-1 [&_small]:opacity-0'
                    >
                        Clientes<small>.</small>
                    </AnimatedTitle>

                    <TextReveal className='md:text-right mt-6 md:mt-4'>
                        <p className='text-18 md:w-80 lg:mt-5 xl:mt-7 2xl:mt-10'>
                            Ideias se tornam soluções quando são construídas ao lado de quem nos inspira<span className='md:hidden'>.</span>
                        </p>
                    </TextReveal>

                </div>

            </div>

            <div className='relative overflow-hidden flex flex-col gap-10 sm:gap-15 md:gap-20 xl:gap-30 mt-14 md:mt-20 lg:mt-25 xl:mt-30'>

                <Marquee logos={logos} />

                <Marquee logos={logos} reverse />
                
            </div>

        </section>
    )
}