'use client'

// libraries
import clsx from 'clsx'
import { useState } from 'react'

// interface
export interface Props {
	question: string
	answer?: string
	isBlack?: boolean
	children?: React.ReactNode
	noPaddingLeft?: boolean
}

export default function Accordion({
	question,
	answer,
	isBlack = false,
	children,
	noPaddingLeft = false
}: Props) {

	const [isActive, setIsActive] = useState(false)

	const toggle = () => {
		setIsActive((prev) => !prev)
	}

	return (
		<div className='block pb-6'>

			<button
				className={clsx(
					'flex justify-between gap-10 w-full cursor-pointer border-t pt-6 transition-colors duration-300 text-left',
					isBlack
						? 'text-black border-t-gray-dark hover:border-t-black'
						: 'text-white border-t-gray-dark hover:border-t-white',
					isActive && (isBlack ? 'border-t-black' : 'border-t-white')
				)}
				onClick={toggle}
				type='button'
			>
				<span className='text-20 uppercase transition-colors duration-300'>
					{question}
				</span>

				<span className='relative flex items-center justify-center w-4 h-4 min-w-4 translate-y-1'>

					<span className={clsx(
						'block w-0.5 h-full bg-current transition-all duration-300',
						isActive && 'rotate-270'
					)} />

					<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-full h-0.5 bg-current transition-colors duration-300' />

				</span>

			</button>

			<div className={clsx(
				'relative overflow-hidden grid grid-rows-[0fr] transition-all duration-300',
				isActive && 'grid-rows-[1fr] overflow-visible'
			)}>
				<div className={clsx(
					'min-h-0 transition-opacity duration-300 invisible opacity-0 overflow-hidden',
					isActive && 'visible opacity-100 overflow-visible'
				)}>
					<div className={clsx(
						'rich-text flex flex-col gap-4 pt-4 px-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2',
						isBlack ? 'text-black' : 'text-white',
						noPaddingLeft && 'px-0! md:px-1!'
					)}>
						{children ? children : (
							<div dangerouslySetInnerHTML={{ __html: answer || '' }} />
						)}
					</div>
				</div>
			</div>

		</div>
	)
}
