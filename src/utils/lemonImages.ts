import lemon1 from '@/assets/img/lemon-1.png'
import lemon2 from '@/assets/img/lemon-2.png'
import lemon3 from '@/assets/img/lemon-3.png'
import lemon4 from '@/assets/img/lemon-4.png'
import lemon5 from '@/assets/img/lemon-5.png'

export const lemonImageSources = [
	lemon1.src,
	lemon2.src,
	lemon3.src,
	lemon4.src,
	lemon5.src,
] as const

let preloaded = false

export function preloadLemonImages() {
	if (preloaded || typeof window === 'undefined') return

	preloaded = true

	for (const src of lemonImageSources) {
		const img = new Image()
		img.src = src
	}
}
