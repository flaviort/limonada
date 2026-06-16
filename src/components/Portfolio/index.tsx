// components
import PortfolioClient from './PortfolioClient'

// libs
import { getPortfolioList } from '@/lib/wordpress/getPortfolio'

export default async function PortfolioPage() {

    const items = await getPortfolioList(3)

    const projects = items.map(item => ({
        href: `/portfolio/${item.slug}`,
        bgImage: {
			node: {
				mediaItemUrl: item.portfolioFields.bgImage?.node?.mediaItemUrl || '',
				sizes: item.portfolioFields.bgImage?.node?.sizes || ''
			}	
		},
        mainImage: {
			node: {
				mediaItemUrl: item.portfolioFields.thumbnail?.node?.mediaItemUrl || '',
				sizes: item.portfolioFields.thumbnail?.node?.sizes || ''
			}
		},
        textLeft: item.title,
        textRight: item.portfolioFields.client,
    }))

    return (
		<PortfolioClient projects={projects} />
	)
}