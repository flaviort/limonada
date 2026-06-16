// libraries
import { Link } from 'next-transition-router'
import Image from 'next/image'

// interface
interface Props {
    href: string
    image: string
    date: string
    title: string
    text: string
    category: string
}

export default function PortfolioBlock({
    href,
    image,
    date,
    title,
    text,
    category
}: Props) {
	return (
		<Link
            href={href}
            data-category={category}
            data-date={date}
            className='bg-black relative overflow-hidden aspect-square rounded-md flex items-end p-4 group after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-linear-0 after:from-black after:to-transparent after:opacity-70'
            aria-label={title + ' - ' + text}
        >
            <Image
                src={image}
                alt={title}
                fill
                sizes='100vw, (max-width: 768px) 50vw, 33vw'
                className='cover absolute inset-0 z-0 opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-600 will-change-transform'
                loading='lazy'
            />

            {/*
            <span className='absolute z-2 top-5 right-5 border border-white px-3 py-1 text-xs text-white rounded-4xl'>
                {category}
            </span>
            */}

			<span className='flex flex-col relative z-2 text-white'>

                <span className='text-24 font-semibold'>
                    {title}
                </span>

                <span>
                    {text}
                </span>

            </span>

		</Link>
	)
}