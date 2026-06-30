// libraries
import clsx from 'clsx'

// components
import { Form, InputHidden, Input, Textarea, Submit } from '@/components/Form'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// types
interface ContactFormSmallProps {
    className?: string
}

export default function ContactFormSmall({
    className,
}: ContactFormSmallProps) {
    return (
        <section className={clsx('bg-white my-20 lg:my-[10vw]', className)}>
            <div className='base-container'>
                <div className='row'>

                    <div className='col-lg-5 col-xl-4'>

                        <AnimatedTitle
                            style='gray-green-dark'
                            className='title-96'
                        >
                            Qual é o desafio do negócio?
                        </AnimatedTitle>

                        <p className='text-green-dark mt-4 lg:pr-10 mb-6'>
                            Cada projeto nasce de um desafio e contexto particular. Nos conte o seu! Estamos prontos para ouvir e construir um caminho juntos.
                        </p>

                    </div>

                    <div className='col-lg-7 col-xl-8'>

                        <Form
                            endpoint='/api/contact'
                            onSuccess={{
                                title: 'Mensagem enviada com sucesso',
                                text: 'Obrigado por entrar em contato. Entraremos em contato o mais breve possível.'
                            }}
                            onError={{
                                title: 'Ocorreu um erro ao enviar a mensagem',
                                text: 'Por favor, tente novamente mais tarde.'
                            }}
                            clearOnSubmit
                        >

                            <InputHidden
                                name='contact_form_home'
                                value='true'
                                id='contact_form_home'
                            />

                            <Input
                                id='name'
                                name='name'
                                label='Nome'
                                placeholder='Digite seu nome'
                                type='text'
                                required
                            />

                            <div className='row'>

                                <div className='col-sm-6'>
                                    <Input
                                        id='email'
                                        name='email'
                                        label='Email'
                                        placeholder='Digite seu email'
                                        type='email'
                                        required
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='phone'
                                        name='phone'
                                        label='Telefone'
                                        placeholder='(00) 00000-0000'
                                        type='tel'
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='company'
                                        name='company'
                                        label='Empresa'
                                        placeholder='Digite o nome da empresa'
                                        type='text'
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='position'
                                        name='position'
                                        label='Cargo'
                                        placeholder='Digite seu cargo'
                                        type='text'
                                    />
                                </div>

                            </div>

                            <Textarea
                                id='challenge'
                                name='challenge'
                                label='Desafio'
                                placeholder='Digite o desafio do negócio'
                                required
                            />

                            <MagneticButton className='max-sm:w-full!'>
                                <Submit
                                    text='Enviar'
                                    className='max-sm:w-full!'
                                />
                            </MagneticButton>

                        </Form>

                    </div>

                </div>
            </div>
        </section>
    )
}