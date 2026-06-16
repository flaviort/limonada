/** @type {import('next').NextConfig} */

const nextConfig = {
	turbopack: {},
	reactStrictMode: false,
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) =>
		  	rule.test?.test?.('.svg')
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [{
								name: 'preset-default',
								params: {
									overrides: {
										removeViewBox: false
									}
								}
							}]
						}
					}
				}]
			}
		)

		fileLoaderRule.exclude = /\.svg$/i
	
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wp.alimonada.com.br'
			}
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		unoptimized: true,
		qualities: [100]
	}
}

export default nextConfig