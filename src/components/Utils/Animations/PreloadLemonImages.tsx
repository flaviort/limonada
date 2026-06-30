'use client'

import { useLayoutEffect } from 'react'
import { preloadLemonImages } from '@/utils/lemonImages'

export default function PreloadLemonImages() {
	useLayoutEffect(() => {
		preloadLemonImages()
	}, [])

	return null
}
