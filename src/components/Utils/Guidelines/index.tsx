'use client'

// libraries
import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function Guidelines() {
	const [isGridVisible, setIsGridVisible] = useState(false)

	const showHideGrid = () => {
		setIsGridVisible((prev) => !prev)
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.shiftKey && event.key.toLowerCase() === 'g') {
				event.preventDefault()
				showHideGrid()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<>
			<div className='flex fixed z-99999999 bottom-2 left-2 p-1 text-xs leading-none bg-black text-white opacity-30 font-sans pointer-events-none before:content-["mob"] before:xs:content-["xs"] before:sm:content-["sm"] before:md:content-["md"] before:lg:content-["lg"] before:xl:content-["xl"] before:2xl:content-["2xl"] before:3xl:content-["3xl"]'></div>

			<div className={clsx('fixed overflow-hidden z-9999 top-0 left-0 w-full h-0 pointer-events-none duration-300 transition-all', isGridVisible && 'h-screen')}>
				<div className='base-container'>
					<div className='row'>
						{Array.from({ length: 12 }).map((_, i) => (
							<div className='col-3 col-sm-2 col-md-1' key={i}>
								<div className='block w-full h-lvh bg-red-500/20'></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
