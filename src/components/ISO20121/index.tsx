// libraries
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Accordion from '@/components/Accordion'
import TextReveal from '@/components/Utils/Animations/TextReveal'

// svg
import UxPdf from '@/assets/svg/ux/pdf.svg'

export default function ISO20121() {
    return (
        <section className='bg-black pb-15 sm:pb-20 md:pb-25 xl:pb-30'>
            <div className='base-container'>
                <div className='bg-yellow py-8 lg:py-15 px-8 lg:px-10 rounded-xl'>
                    <div className='row'>

                        <div className='col-lg-4 mb-10 lg:mb-0'>

                            <h2 className='font-heading uppercase text-60 font-semibold tracking-tighter mb-6'>
                                Responsabilidade Corporativa
                            </h2>

                            <p className='text-18 lg:pr-4'>
                                A atuação da Agência Esfera é orientada por práticas de governança, sustentabilidade e conformidade, integrando políticas institucionais e certificações que norteiam nossa operação.
                            </p>
                            
                        </div>

                        <div className='col-lg-8'>

                            <Accordion
                                isBlack
                                noPaddingLeft
                                question='ISO 20121 - Sistema de Gestão para Eventos Sustentáveis'
                            >

                                <p>
                                    A ISO 20121 estabelece diretrizes para planejamento e execução de eventos com foco em sustentabilidade, gestão de impactos e melhoria contínua.<br /><br />

                                    Estamos entre as primeiras empresas brasileiras a adotar essa norma, reforçando nosso compromisso com práticas estruturadas de gestão em eventos.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <a
                                        href='/pdf/politica-de-sustentabilidade.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white max-sm:px-6! leading-normal!'
                                    >
                                        Política de Sustentabilidade <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current max-sm:hidden' />
                                    </a>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                noPaddingLeft
                                question='Código de Conduta de Fornecedores'
                            >

                                <p>
                                    Diretrizes que orientam relações transparentes, éticas e responsáveis fornecedores.<br /><br />

                                    O alinhamento com nossos parceiros é parte essencial da consistência operacional e da integridade dos projetos.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <Link
                                        href='/pdf/codigo-de-conduta-fornecedores.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white max-sm:px-6! leading-normal!'
                                    >
                                        Código de Conduta de Fornecedores <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current max-sm:hidden' />
                                    </Link>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                noPaddingLeft
                                question='Política de Privacidade'
                            >

                                <p>
                                    Informações sobre coleta, uso e proteção de dados, em conformidade com as normas aplicáveis.<br /><br />

                                    Tratamos a privacidade e a segurança das informações como parte integrante de nossas práticas de responsabilidade corporativa.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <Link
                                        href='/pdf/politica-de-seguranca-da-informacao-e-protecao-de-privacidade.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white max-sm:px-6! leading-normal!'
                                    >
                                        Política de Privacidade <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current max-sm:hidden' />
                                    </Link>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                noPaddingLeft
                                question='Apoios Institucionais'
                            >

                                <p>
                                    Apoiamos iniciativas que geram impacto positivo em comunidades locais e internacionais.
                                </p>

                                <div className='grid sm:flex sm:flex-wrap gap-2 md:gap-4'>
                                    {[
                                        {
                                            src: '/img/badges/pequeno-principe.png',
                                            url: 'https://pequenoprincipe.org.br/',
                                            alt: 'Pequeno Príncipe',
                                            width: 840,
                                            height: 840,
                                            aspect: 'square'
                                        },
                                        {
                                            src: '/img/badges/fadc.png',
                                            url: 'https://www.fadc.org.br/',
                                            alt: 'FADC',
                                            width: 596,
                                            height: 183,
                                            aspect: 'video'
                                        },
                                        {
                                            src: '/img/badges/msf.png',
                                            url: 'https://www.msf.org.br/',
                                            alt: 'Médicos sem Fronteiras',
                                            width: 1200,
                                            height: 161,
                                            aspect: 'super-wide'
                                        }
                                    ].map((item, i) => (
                                        <Link
                                            key={i}
                                            href={item.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={clsx(
                                                'flex items-center justify-center bg-white rounded-md p-5 h-30! md:h-40! before:content-none! after:content-none! hover:scale-95 transition-all duration-200',
                                                item.aspect === 'square' && 'sm:aspect-square',
                                                item.aspect === 'video' && 'sm:aspect-video',
                                                item.aspect === 'super-wide' && 'sm:aspect-16/6'
                                            )}
                                        >
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                width={item.width}
                                                height={item.height}
                                                className='w-full h-full object-contain'
                                                loading='lazy'
                                            />
                                        </Link>
                                    ))}
                                </div>

                            </Accordion>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}