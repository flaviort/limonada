// libraries
import { GraphQLClient, gql } from 'graphql-request'

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
        mainContent?: Array<{
            fieldGroupName?: string
            
            // multi text
            multi_text_content?: string
            multi_text_title?: string
            multi_text_subtitle?: string
            
            // fs media
            fs_media_alt?: string
            fs_media_image?: {
                node: {
                    srcSet: string
                    sizes: string
                    mediaItemUrl: string
                }
            }
            fs_media_video?: {
                node: {
                    mediaItemUrl: string
                }
            }

            // big media
            big_media_alt?: string
            big_media_image?: {
                node: {
                    srcSet: string
                    sizes: string
                    mediaItemUrl: string
                }
            }
            big_media_video?: {
                node: {
                    mediaItemUrl: string
                }
            }

            // double slider
            double_slider_top?: Array<{
                alt?: string
                fieldGroupName?: string
                image?: {
                    node: {
                        mediaItemUrl: string
                        sizes: string
                        srcSet: string
                    }
                }
                video?: {
                    node: {
                        mediaItemUrl: string
                    }
                }
            }>
            double_slider_bottom?: Array<{
                alt?: string
                fieldGroupName?: string
                image?: {
                    node: {
                        mediaItemUrl: string
                        sizes: string
                        srcSet: string
                    }
                }
                video?: {
                    node: {
                        mediaItemUrl: string
                    }
                }
            }>

            // expanding grid
            expanding_grid_media?: Array<{
                alt?: string
                fieldGroupName?: string
                image?: {
                    node: {
                        mediaItemUrl: string
                        sizes: string
                        srcSet: string
                    }
                }
                video?: {
                    node: {
                        mediaItemUrl: string
                    }
                }
            }>
        }>
    }
    categories: PortfolioCategory
}

// constants
const endpoint = process.env.WP_GRAPHQL as string

// client
const client = new GraphQLClient(endpoint)

// graphql query
const query = gql`
    query GetPortfolioBySlug($slug: String!) {
        posts(
            where: {
                name: $slug
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
                    mainContent {
                        ... on PortfolioFieldsMainContentMultiTextLayout {
                            fieldGroupName
                            multi_text_title
                            multi_text_subtitle
                            multi_text_content
                        }
                        ... on PortfolioFieldsMainContentFsMediaLayout {
                            fieldGroupName
                            fs_media_alt
                            fs_media_image {
                                node {
                                    srcSet
                                    sizes
                                    mediaItemUrl
                                }
                            }
                            fs_media_video {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentBigMediaLayout {
                            fieldGroupName
                            big_media_alt
                            big_media_image {
                                node {
                                    srcSet
                                    sizes
                                    mediaItemUrl
                                }
                            }
                            big_media_video {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentDoubleSliderLayout {
                            fieldGroupName
                            double_slider_top {
                                fieldGroupName
                                alt
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                            double_slider_bottom {
                                alt
                                fieldGroupName
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentExpandingGridLayout {
                            fieldGroupName
                            expanding_grid_media {
                                fieldGroupName
                                alt
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentTwoMediaLayout {
                            fieldGroupName
                            two_media {
                                fieldGroupName
                                alt
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentStoriesSliderLayout {
                            fieldGroupName
                            stories_slider_media {
                                fieldGroupName
                                alt
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        ... on PortfolioFieldsMainContentBigMediaSliderLayout {
                            fieldGroupName
                            big_media_slider_media {
                                fieldGroupName
                                alt
                                image {
                                    node {
                                        mediaItemUrl
                                        sizes
                                        srcSet
                                    }
                                }
                                video {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

// fetch function
export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
    const data = await client.request(query, { slug })
    return data.posts.nodes[0] ?? null
}
