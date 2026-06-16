// libraries
import { Link } from 'next-transition-router'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// utils
import { pages } from '@/utils/routes'

export const metadata = {
	title: 'Erro 404: Página não encontrada | Agência Esfera'
}

export default function Error404() {
	return (
		<main>
			<section className='bg-black text-white text-center'>
				<div className='base-container min-h-svh flex flex-col items-center justify-center py-35 md:py-40 xl:py-50 gap-10 sm:gap-15'>

					<h1 className='text-100 font-heading font-semibold uppercase tracking-tighter mt-10 sm:mt-20 max-sm:text-[25vw]!'>
						Erro <span className='text-yellow'>404</span>
					</h1>

					<p className='text-20'>
						Parece que o link que você seguiu não está mais disponível.
					</p>

					<MagneticButton>
						<Link
							href={pages.home}
							className='button button--hollow-white'
						>
							Voltar para a Home
						</Link>
					</MagneticButton>

				</div>
			</section>
		</main>
	)
}
