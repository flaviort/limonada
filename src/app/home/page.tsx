// components
import Intro from '@/app/home/Intro'
import TagSwap from '@/components/TagSwap'
import BigNumbers from '@/components/BigNumbers'
import ClientsSlider from '@/components/ClientsSlider'

// ISR
export const revalidate = 3600

export default function Home() {
	return (
		<main>

			<Intro />

			<TagSwap />

			<BigNumbers
				title='Seu evento, nossa missão'
				text='A gente soma números com expertise e mostra resultados com orgulho.'
			/>

			<ClientsSlider />

		</main>
	)
}
