// components
import ClientsSlider from '@/components/ClientsSlider'

// ISR
export const revalidate = 3600

export default function Home() {
	return (
		<main>

			<div className='min-h-[150vh] block w-full bg-white' />
			
			<ClientsSlider />

		</main>
	)
}
