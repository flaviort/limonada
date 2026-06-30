// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { Link } from 'next-transition-router'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'

// images
import teamBannerImage from '@/assets/img/team.jpg'

// utils
import { pages } from '@/utils/routes'

// types
interface TeamBannerProps {
    className?: string
}

export default function TeamBanner({
    className
}: TeamBannerProps) {
    return (
        <section className={clsx('bg-white my-20 lg:my-[12vw]', className)}>
            <div className='base-container'>
                <div className='relative overflow-hidden rounded-xl lg:rounded-3xl bg-[#5B5555]'>

                    <div className='relative md:absolute z-0 md:top-0 md:right-0 w-full md:w-[60%] xl:w-[70%] h-[150vw] sm:h-[100vw] md:h-full'>

                        <div className='absolute z-2 md:top-0 max-md:-bottom-1 left-0 w-full md:w-1/3 h-1/2 md:h-full bg-linear-to-b md:bg-linear-to-l from-transparent to-[#5B5555]' />

                        <ScrollingImage>
                            <Image
                                src={teamBannerImage}
                                alt='Time Limonada'
                                className='absolute top-0 left-0 w-full md:w-[110%] md:max-w-[110%] h-full object-cover object-[45%_20%] sm:object-[30%_20%] md:object-[20%_20%]'
                                sizes='(max-width: 1200px) 100vw, 70vw'
                            />
                        </ScrollingImage>

                    </div>

                    <div className='relative z-2 flex flex-col gap-6 md:max-w-[55%] pb-10 px-6 sm:p-10 lg:p-20 xl:p-25 -mt-[35vw] sm:-mt-16 md:mt-0'>

                        <h2 className='title-96 text-white md:whitespace-nowrap'>
                            Do entendimento <br className='max-md:hidden' />
                            profundo à <br className='max-md:hidden' />
                            execução <br className='max-md:hidden' />
                            consistente
                        </h2>

                        <p className='text-white xl:max-w-[75%]'>
                            Combinamos nossos aprendizados de mais de 20 anos no mercado corporativo para ser o parceiro estratégico que provoca novas perspectivas sobre desafios e oportunidades do negócio.<br /><br />

                            Amamos desafios e transformamos <br />
                            <strong>limões em Limonada.</strong>
                        </p>

                        <MagneticButton>
                            <Link
                                href={pages.quem_somos}
                                className='button button--green-neon whitespace-nowrap'
                            >
                                <span className='max-sm:hidden'>Conheça quem faz a Limonada</span>
                                <span className='sm:hidden'>Nosso time</span>
                            </Link>
                        </MagneticButton>

                    </div>

                </div>
            </div>
        </section>
    )
}