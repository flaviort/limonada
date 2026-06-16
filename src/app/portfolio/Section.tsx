'use client'

// libraries
import { useState, useMemo} from 'react'
import { AnimatePresence, motion } from 'motion/react'

// components
import PortfolioBlock from '@/components/PortfolioBlock'

// interface
interface Props {
    projects: {
        href: string
        image: {
            node: {
                mediaItemUrl: string
                sizes: string
            }
        }
        date: string
        title: string
        text: string
        category: string
    }[]
}

export default function Section({
    projects
}: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // extract all unique categories from projects
    const categories = useMemo(() => {
        const categorySet = new Set<string>()
        projects.forEach(project => {
            if (project.category) {
                categorySet.add(project.category)
            }
        })
        return Array.from(categorySet).sort()
    }, [projects])

    // filter projects based on selected category
    const filteredProjects = useMemo(() => {
        if (!selectedCategory) {
            return projects
        }
        return projects.filter(project => project.category === selectedCategory)
    }, [projects, selectedCategory])

    return (
        <section className='bg-black pt-35 md:pt-40 xl:pt-50 pb-15 md:pb-20 xl:pb-30'>
            <div className='base-container'>
                
                <div className='flex flex-col xl:flex-row xl:items-baseline xl:justify-between gap-15 md:gap-10 xl:gap-4'>

                    <div className='flex flex-col md:flex-row md:items-baseline gap-4'>

                        <h1 className='font-heading uppercase text-100 font-semibold text-white'>
                            Portfólio
                        </h1>

                        <h2 className='text-yellow text-20'>
                            Paixão por fazer
                        </h2>

                    </div>

                    {categories.length >= 2 && (
                        <div className='flex items-center gap-4 text-white text-20'>

                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`hover-underline ${!selectedCategory ? 'text-yellow' : ''}`}
                            >
                                Tudo
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`hover-underline ${selectedCategory === category ? 'text-yellow' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}

                        </div>
                    )}

                </div>

                <div className='grid mt-6 md:mt-10 xl:mt-20 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    <AnimatePresence initial={false} mode="sync">
                        {filteredProjects.map((item, index) => (
                            <motion.div
                                key={item.href}
                                layout
                                initial={{
                                    scale: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        ease: [0.25, 0.1, 0.25, 1.0]
                                    }
                                }}
                                exit={{
                                    scale: 0,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.3,
                                        ease: [0.25, 0.1, 0.25, 1.0]
                                    }
                                }}
                            >
                                <PortfolioBlock
                                    href={item.href}
                                    image={item.image.node.mediaItemUrl}
                                    date={item.date}
                                    title={item.title}
                                    text={item.text}
                                    category={item.category}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}