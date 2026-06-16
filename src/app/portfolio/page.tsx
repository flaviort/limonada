// components
import Section from './Section'

// libs
import { getPortfolioList } from '@/lib/wordpress/getPortfolio'

// ISR
export const revalidate = 3600

export const metadata = {
	title: 'Portfólio Agência Esfera',
	description: 'Confira o nosso portfólio de projetos.',
	canonical: '/portfolio'
}

export default async function Portfolio() {

	const items = await getPortfolioList()

    const projects = items.map(item => ({
        href: `/portfolio/${item.slug}`,
        image: {
			node: {
				mediaItemUrl: item.portfolioFields.thumbnail?.node?.mediaItemUrl || '',
				sizes: item.portfolioFields.thumbnail?.node?.sizes || ''
			}
		},
		date: item.date,
		title: item.title,
		text: item.portfolioFields.client,
		category: item.categories.nodes[0].name
    }))

	return (
		<main>
			<Section projects={projects} />
		</main>
	)
}
