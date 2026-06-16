// libraries
import { GraphQLClient, gql } from 'graphql-request'

// constants
const endpoint = process.env.WP_GRAPHQL

if (!endpoint) {
	throw new Error('WP_GRAPHQL environment variable is not defined. Please add it to your .env.local file.')
}

// client
const client = new GraphQLClient(endpoint)

// types
export type PortfolioImage = {
    node: {
        srcSet: string
        sizes: string
        mediaItemUrl: string
    }
}

export type PortfolioCategory = {
    nodes: {
        name: string
    }[]
}

export type PortfolioItem = {
    id: string
    title: string
    slug: string
    date: string
    portfolioFields: {
        area: string
        client: string
        excerpt: string
        subtitle: string
        year: string
        thumbnail: PortfolioImage
        bgImage: PortfolioImage
    }
    categories: PortfolioCategory
}

// graphql query
const query = gql`
    query GetPortfolio($limit: Int!) {
        posts(
            first: $limit
            where: {
                orderby: {
                    field: DATE,
                    order: DESC
                }
            }
        ) {
            nodes {
                id
                title
                slug
                date
                categories {
                    nodes {
                        name
                    }
                }
                portfolioFields {
                    area
                    client
                    excerpt
                    subtitle
                    year
                    thumbnail {
                        node {
                            sizes
                            mediaItemUrl
                        }
                    }
                    bgImage {
                        node {
                            sizes
                            mediaItemUrl
                        }
                    }
                }
            }
        }
    }
`

// featch function
export async function getPortfolioList(limit: number = 999): Promise<PortfolioItem[]> {
    const data = await client.request(query, { limit })
    return data.posts.nodes
}
