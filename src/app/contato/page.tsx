// libraries
import { Link } from 'next-transition-router'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import { Form, Input, InputHidden, Textarea, Checkbox, Submit } from '@/components/Form'

// utils
import { phone, email } from '@/utils/functions'
import { contact } from '@/utils/routes'

export const metadata = {
	title: 'Contato Limonada: Endereço | Telefone | Email | Redes Sociais',
	description: 'Entre em contato conosco para tirar suas ideias do papel.',
	canonical: '/contato'
}

export default function Contact() {
	return (
		<main>

			<section className='bg-white pt-35 md:pt-40 xl:pt-50 pb-15 md:pb-20 xl:pb-30'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-6 xl:pr-20! mb-10 lg:mb-0'>

							<h1 className='text-100 font-heading font-semibold uppercase tracking-tighter'>
								Let's Talk
							</h1>

							<p className='text-24 my-5 lg:my-10 leading-normal'>
								Estamos aqui, é so chamar!<br />
								Entre em contato e marque um café na Limonada!
							</p>

							<div className='bg-yellow p-6 md:p-10 rounded-lg w-full block'>

								<div className='flex flex-col mt-12 lg:mt-6'>
									
									<MagneticButton>
										<Link
											href={phone(contact.phone)}
											className='text-20 hover-underline'
										>
											{contact.phone}
										</Link>
									</MagneticButton>

									<MagneticButton>
										<Link
											href={email(contact.email)}
											className='text-18 font-semibold hover-underline max-sm:text-base!'
										>
											{contact.email}
										</Link>
									</MagneticButton>

									<div className='text-18 max-sm:text-base! mt-6'>
										Quer fazer parte do time Limonada? <br />
										<MagneticButton>
											<Link
												href='https://limonadahub.vagas.solides.com.br/'
												target='_blank'
												rel='noopener noreferrer'
												className='font-semibold hover-underline-white after:bg-yellow!'
											>
												Cadastre-se no nosso banco de talentos!
											</Link>
										</MagneticButton>
									</div>

								</div>

							</div>

						</div>

						<div className='col-lg-6'>
							<Form
								endpoint='/api/resend'
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
									name='form'
									value='contact'
									id='form'
								/>

								<Input
									id='name'
									name='Nome'
									label='Nome'
									placeholder='Digite seu nome'
									type='text'
									required
								/>

								<Input
									id='email'
									name='Email'
									label='Email'
									placeholder='Digite seu email'
									type='email'
									required
								/>

								<Input
									id='phone'
									name='Telefone'
									label='Telefone'
									placeholder='(00) 00000-0000'
									type='tel'
									required
								/>

								<Textarea
									id='message'
									name='Mensagem'
									label='Mensagem'
									placeholder='Digite sua mensagem'
									required
								/>

								<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>

									<Checkbox
										id='newsletter'
										name='Newsletter'
										checked
										type='checkbox'
										label='Concordo em receber comunicações de acordo com meus interesses.'
										className='mb-0!'
									/>

									<MagneticButton className='max-sm:w-full!'>
										<Submit
											text='Enviar'
											className='max-sm:w-full!'
										/>
									</MagneticButton>

								</div>

							</Form>
						</div>

					</div>
				</div>
			</section>

		</main>
	)
}
