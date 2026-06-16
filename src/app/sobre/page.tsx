// libraries
import Image from 'next/image'

// components
import BannerInternal from '@/components/BannerInternal'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import Services from './Services'
import Testimonials from './Testimonials'
import Awards from './Awards'
import BigNumbers from '@/components/BigNumbers'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Video from '@/components/Video'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'
import ISO20121 from '@/components/ISO20121'

// utils
import { logos } from '@/utils/logos'

export const metadata = {
	title: 'Sobre a Esfera',
	description: 'Conheça a Agência Esfera, uma agência de marketing digital que transforma ideias em resultados.',
	canonical: '/sobre'
}

export default function About() {
    return (
        <main>

            <BannerInternal
                image='/img/team.jpg'
                subtitle='Sobre'
                title='Somos uma agência de eventos corporativos'
            >
                <p className='text-20 leading-loose! text-white'>
                    Trabalhamos com <b>energia, paixão e respeito,</b> e acreditamos que transparência e confiança são a base para construir boas parcerias.
                </p>
            </BannerInternal>

            <MultiText
                title='Nossos eventos conectam pessoas, ideias e marcas'
                subTitle='Quem somos'
                className='pt-16 sm:pt-28 lg:pt-32'
            >
                <p className=''>
                    Com serviços integrados de ponta a ponta, a gente gera valor com inteligência e entrega uma experiência sempre completa. <br /><br />
                    
                    <b>E então, vamos criar uma nova história juntos?</b>
                </p>
            </MultiText>

            <Services />

            <section className='overflow-hidden bg-white mb-16 sm:mb-28 lg:mb-32'>

                <div className='bg-black absolute z-0 top-0 left-0 w-full h-[75%]' />

                <div className='base-container relative z-2'>
                    <div className='relative overflow-hidden w-full md:grid md:grid-cols-2 rounded-md md:rounded-lg bg-black'>

                        <div className='relative overflow-hidden flex flex-col justify-center'>

                            <Video
                                video='/videos/sobre.mp4'
                                className='cover opacity-30'
                            />

                            <div className='flex flex-col gap-6 relative z-2 p-8 md:p-10 lg:p-15 xl:p-20'>

                                <h2 className='font-heading uppercase text-36 text-yellow font-semibold tracking-tight'>
                                    <AnimatedText text='Como fazemos' />
                                </h2>

                                <h3 className='text-36 font-semibold text-white'>
                                    Mais do que fazer, é fazer do jeito certo
                                </h3>

                                <p className='text-white'>
                                    E como a gente transforma teoria em prática? <br />

                                    Com processos estruturados, liderados por frentes que se revezam em perfeita sincronia.
                                </p>

                            </div>

                        </div>
                        
                        <div className='bg-yellow p-8 md:p-10 xl:p-20 grid xl:grid-cols-2 gap-5 lg:gap-10 xl:gap-14'>
                            {[
                                'Atendimento e planejamento estratégico',
                                'Criação, comunicação e soluções web',
                                'Organização e produção',
                                'Diagnóstico pós-evento'
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className='flex gap-4 md:block w-full pt-5 lg:pt-10 xl:pt-5 border-t border-t-black max-xl:first:border-t-0 max-xl:first:pt-0'
                                >
                                    <p className='block md:mb-1 xl:mb-3 max-md:text-lg'>
                                        {i+1}
                                    </p>

                                    <h4 className='text-20 font-semibold'>
                                        <AnimatedText text={item} />
                                    </h4>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </section>

            <MultiText className='mb-10!'>
                <p className='text-20 leading-relaxed!'>
                    Nossa missão é criar experiências inovadoras que fortalecem e impulsionam o sucesso dos clientes com:
                </p>
            </MultiText>

            <MultiText
                title='Integridade Criatividade e Responsabilidade'
                className='[&_h2]:leading-tight!'
            />

            <BigNumbers
                title='Na Esfera acontece'
                text='E somamos mais alguns números também...'
            />

            <section className='py-15 sm:py-20 md:py-25 xl:py-30'>
                <div className='base-container'>
                    
                    <h2 className='font-heading uppercase text-100 font-semibold tracking-tighter block mb-6 md:mb-10'>
                        <AnimatedText text='Nossos parceiros' />
                    </h2>

                    <StaggerScale
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1'
                        infinite
                    >
                        {logos.map((item, i) => (
                            <div
                                key={i}
                                className='flex items-center justify-center w-full h-auto aspect-square bg-white border border-gray-lighter/25 rounded-md p-8 xs:p-10 sm:p-12 transition-colors duration-200 hover:border-gray-light group'
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={100}
                                    height={100}
                                    className='block w-full max-h-[75%] h-auto object-contain brightness-0 opacity-75 group-hover:opacity-100 transition-opacity duration-200'
                                />
                            </div>
                        ))}
                    </StaggerScale>

                </div>
            </section>

            {/*
            <Testimonials />
            */}

            <Awards />

            <ISO20121 />

        </main>
    )
}