// libraries
import clsx from 'clsx'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Counter from '@/components/Utils/Animations/Counter'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// interface
interface Props {
    title: string
    text: string
}

export default function BigNumbers({
    title,
    text
}: Props) {
    return (
        <section className='bg-black pt-10 pb-20 sm:pt-20 md:py-25 xl:py-30'>
            <div className='base-container'>

                <h2 className='font-heading uppercase text-100 font-semibold tracking-tighter text-white block mb-6 md:mb-10'>
                    <AnimatedText text={title} />
                </h2>

                <TextReveal>
                    <p className='text-30 text-yellow w-150 max-w-full leading-relaxed tracking-normal max-sm:text-base!'>
                        {text}
                    </p>
                </TextReveal>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_1.275fr_1fr_1fr] gap-10 sm:gap-y-15 md:gap-y-20 gap-x-7.5 mt-10 xs:mt-15 sm:mt-20'>
                    {[
                        {
                            hasPlus: false,
                            number: 26,
                            text: 'Anos de <br />experiência'
                        },
                        {
                            hasPlus: true,
                            number: 6500,
                            text: 'Projetos <br/>executados'
                        },
                        {
                            hasPlus: true,
                            number: 350,
                            text: 'Clientes <br />satisfeitos'
                        },
                        {
                            hasPlus: false,
                            number: 25,
                            text: 'Prêmios <br />no setor'
                        }
                    ].map((item, i) => (
                        <div key={i}>

                            <div className='block w-full h-px bg-gray-dark' />

                            <p className='block text-white text-sm my-5 sm:mb-10'>
                                {i+1}
                            </p>

                            <div className='relative flex items-end gap-4'>

                                {item.hasPlus && (
                                    <p className='absolute -top-2 sm:-top-4 left-0 sm:-left-2 text-white text-36 max-sm:text-base!'>
                                        +
                                    </p>
                                )}

                                <p className={clsx(
                                    'text-7xl sm:text-6xl md:text-7xl xl:text-[5vw] text-white tracking-tighter leading-none',
                                    item.hasPlus && 'pl-3'
                                )}>
                                    <Counter number={item.number} />
                                </p>

                                <p
                                    className='text-gray-medium text-sm uppercase pb-2 tracking-normal'
                                    dangerouslySetInnerHTML={{ __html: item.text }}
                                />

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}