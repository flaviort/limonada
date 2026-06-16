// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import Image from 'next/image'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import FollowMouse from '@/components/Utils/Animations/FollowMouse'

// utils
import { pages } from '@/utils/routes'

interface Props {
    href: string
    image: string
    title: string
}

export default function NextProject({
    href,
    image,
    title
}: Props) {
    return (
        <section className='bg-black pt-20 lg:pt-40'>

            <div className='relative group'>
                <FollowMouse text='Ver Case'>

                    <Link
                        href={href}
                        className='absolute z-2 inset-0 overflow-hidden w-full h-full opacity-0'
                    />

                    <div className='base-container relative z-0 mb-10 lg:mb-0'>
                        <div className='flex flex-col items-center justify-center text-center'>

                            <p className='text-white text-20 mb-2 md:mb-5 group-hover:text-yellow transition-colors duration-500'>
                                Próximo projeto
                            </p>

                            <h2 className='text-60 text-white font-semibold group-hover:opacity-50 transition-all duration-500'>
                                {title}
                            </h2>

                            <div
                                className='relative z-3 block w-full mt-6 lg:-mt-40'
                                style={{
                                    clipPath: 'inset(-100% 0% 0% 0%)'
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={title}
                                    width={500}
                                    height={500}
                                    className='relative overflow-hidden rounded-tl-md rounded-tr-md block max-w-[75%] w-100 h-auto aspect-3/4 object-cover mx-auto lg:will-change-transform lg:translate-y-60 lg:transition-transform lg:duration-500 lg:group-hover:translate-y-30'
                                />
                            </div>

                        </div>
                    </div>

                </FollowMouse>
            </div>

            <div className='base-container'>
                <div className='flex items-center justify-center text-center border-t border-t-gray-medium pt-10 pb-20 lg:pt-20'>
                    <MagneticButton>
                        <Link
                            href={pages.portfolio}
                            className='button button--hollow-white lowercase'
                        >
                            Ver todos
                        </Link>
                    </MagneticButton>
                </div>
            </div>

        </section>
    )
}