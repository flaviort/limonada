'use client'

import { useEffect } from 'react'

export default function ViewportHeight() {
	useEffect(() => {
		// Check if device is iOS
		const userAgent = navigator.userAgent
		const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
			(userAgent.includes('Mac') && navigator.maxTouchPoints > 1)
		
		if (isIOS) {
			document.documentElement.classList.add('is-ios')
		}

		const setVH = () => {
			// Measure the actual #viewport element's clientHeight
			// This reflects the actual visible viewport, accounting for mobile URL bars
			const viewportEl = document.getElementById('viewport')
			
			let height: number
			
			if (viewportEl) {
				// Use the viewport element's actual visible height
				height = viewportEl.clientHeight
			} else if (window.visualViewport) {
				// Fallback to visualViewport if viewport element not found
				height = window.visualViewport.height
			} else {
				// Last resort: window.innerHeight
				height = window.innerHeight
			}
			
			const vh = height / 100
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}

		// Set initial value
		const initTimer = setTimeout(setVH, 0)

		// Update on resize
		window.addEventListener('resize', setVH)

		// Handle orientation change with delay
		const handleOrientationChange = () => {
			setTimeout(setVH, 100)
		}
		window.addEventListener('orientationchange', handleOrientationChange)

		// Use visualViewport API if available
		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', setVH)
		}

		// Listen to scroll on #viewport - update when scrolling (URL bar might hide/show)
		const viewport = document.getElementById('viewport')
		let lastHeight = 0
		let ticking = false
		
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const currentHeight = viewport?.clientHeight || window.innerHeight
					// Only update if height actually changed (URL bar hide/show)
					if (Math.abs(currentHeight - lastHeight) > 1) {
						setVH()
						lastHeight = currentHeight
					}
					ticking = false
				})
				ticking = true
			}
		}

		if (viewport) {
			viewport.addEventListener('scroll', handleScroll, { passive: true })
			// Also listen to touch events which might trigger URL bar changes
			viewport.addEventListener('touchstart', setVH, { passive: true })
			viewport.addEventListener('touchend', setVH, { passive: true })
		}

		// Periodic check on mobile to catch any missed updates
		let mobileCheckInterval: NodeJS.Timeout | null = null
		if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileCheckInterval = setInterval(() => {
				const currentHeight = viewport?.clientHeight || window.innerHeight
				if (Math.abs(currentHeight - lastHeight) > 1) {
					setVH()
					lastHeight = currentHeight
				}
			}, 200)
		}

		return () => {
			clearTimeout(initTimer)
			window.removeEventListener('resize', setVH)
			window.removeEventListener('orientationchange', handleOrientationChange)
			if (viewport) {
				viewport.removeEventListener('scroll', handleScroll)
				viewport.removeEventListener('touchstart', setVH)
				viewport.removeEventListener('touchend', setVH)
			}
			if (window.visualViewport) {
				window.visualViewport.removeEventListener('resize', setVH)
			}
			if (mobileCheckInterval) {
				clearInterval(mobileCheckInterval)
			}
		}
	}, [])

	return null
}

