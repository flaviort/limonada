'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import clsx from 'clsx'

import { lemonImageSources } from '@/utils/lemonImages'

const lemon_images = [...lemonImageSources]
const lemon_class = 'absolute top-0 left-0 z-20 h-auto w-[20vw] md:w-[12vw] aspect-square max-w-none object-contain select-none will-change-transform cursor-grab pointer-events-auto active:cursor-grabbing'
const wall_size = 60

const LEMON_PHYSICS: Matter.IBodyDefinition = {
	restitution: 0.35,
	friction: 0.65,
	frictionStatic: 0.85,
	frictionAir: 0.012,
	density: 20,
}

const wall_physics: Matter.IChamferableBodyDefinition = {
	isStatic: true,
	friction: 0.9,
	frictionStatic: 1,
	restitution: 0.35,
}

function getLemonSizePx() {
	const vw = window.matchMedia('(min-width: 768px)').matches ? 11.5 : 19.5
	return (vw / 100) * window.innerWidth
}

function makeWalls(w: number, h: number) {
	return [
		Matter.Bodies.rectangle(w / 2, h + wall_size / 2, w + wall_size * 2, wall_size, wall_physics),    // floor
		Matter.Bodies.rectangle(-wall_size / 2, h / 2, wall_size, h + wall_size * 2, wall_physics),        // left
		Matter.Bodies.rectangle(w + wall_size / 2, h / 2, wall_size, h + wall_size * 2, wall_physics),     // right
	]
}

function makeCeiling(w: number) {
	return Matter.Bodies.rectangle(w / 2, -wall_size / 2, w + wall_size * 2, wall_size, wall_physics)
}

interface LemonEntry {
	body: Matter.Body
	el: HTMLImageElement
	size: number
}

function initPhysics(container: HTMLDivElement, layer: HTMLDivElement, count: number) {
	const engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0025 } })
	const { world } = engine
	let w = container.clientWidth
	let h = container.clientHeight

	if (w < 1 || h < 1) return () => undefined

	let walls = makeWalls(w, h)
	let ceiling: Matter.Body | null = null

	Matter.Composite.add(world, walls)
	container.style.overflow = 'visible'
	layer.style.overflow = 'visible'

	const entries: LemonEntry[] = []
	for (let i = 0; i < count; i++) {
		const size = getLemonSizePx()
		const r = size / 2
		const x = r + Math.random() * (w - r * 2)
		const y = -(r + Math.random() * h * 0.4 + i * 80)

		const body = Matter.Bodies.circle(x, y, r, { ...LEMON_PHYSICS, angle: (Math.random() - 0.5) * Math.PI })
		const el = document.createElement('img')
		el.src = lemon_images[Math.floor(Math.random() * lemon_images.length)]
		el.alt = ''
		el.draggable = false
		el.className = lemon_class
		layer.appendChild(el)

		Matter.Composite.add(world, body)
		entries.push({ body, el, size })
	}

	// Matter.js steals scroll events — remove them so the page still scrolls
	const mouse = Matter.Mouse.create(layer)
	const m = mouse as Matter.Mouse & { mousewheel: (e: Event) => void }
	m.element.removeEventListener('mousewheel', m.mousewheel)
	m.element.removeEventListener('DOMMouseScroll', m.mousewheel)
	const mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse,
		constraint: { stiffness: 0.65, damping: 0.08, render: { visible: false } },
	})
	Matter.Composite.add(world, mouseConstraint)

	const runner = Matter.Runner.create()
	Matter.Runner.run(runner, engine)

	const enableCeiling = () => {
		if (ceiling) return
		ceiling = makeCeiling(w)
		Matter.Composite.add(world, ceiling)
		container.style.overflow = 'hidden'
		layer.style.overflow = 'hidden'
	}

	const ceilingFallback = window.setTimeout(enableCeiling, 5000)

	const syncDom = () => {
		for (const { body, el, size } of entries) {
			const x = body.position.x - size / 2
			const y = body.position.y - size / 2
			el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`
			el.style.visibility =
				x + size < 0 || x > w || (ceiling && (y + size < 0 || y > h)) ? 'hidden' : 'visible'
		}

		if (!ceiling && entries.every(({ body, size }) => body.position.y >= size / 2)) {
			enableCeiling()
		}
	}

	Matter.Events.on(engine, 'afterUpdate', syncDom)
	syncDom()

	const handleResize = () => {
		const nextW = container.clientWidth
		const nextH = container.clientHeight
		if (nextW < 1 || nextH < 1) return

		if (nextW !== w || nextH !== h) {
			Matter.Composite.remove(world, ceiling ? [...walls, ceiling] : walls)
			walls = makeWalls(nextW, nextH)
			if (ceiling) ceiling = makeCeiling(nextW)
			Matter.Composite.add(world, ceiling ? [...walls, ceiling] : walls)
			w = nextW
			h = nextH
		}

		for (const entry of entries) {
			const nextSize = getLemonSizePx()
			const scale = nextSize / entry.size
			if (Math.abs(scale - 1) > 0.001) {
				Matter.Body.scale(entry.body, scale, scale)
				entry.size = nextSize
			}
		}
	}

	const resizeObserver = new ResizeObserver(handleResize)
	resizeObserver.observe(container)
	window.addEventListener('resize', handleResize)

	return () => {
		window.clearTimeout(ceilingFallback)
		resizeObserver.disconnect()
		window.removeEventListener('resize', handleResize)
		container.style.overflow = ''
		layer.style.overflow = ''
		Matter.Events.off(engine, 'afterUpdate', syncDom)
		Matter.Runner.stop(runner)
		Matter.Composite.remove(world, mouseConstraint)
		Matter.Engine.clear(engine)
		Matter.Mouse.clearSourceEvents(m)
		for (const { el } of entries) el.remove()
	}
}

interface LemonFallProps extends React.HTMLAttributes<HTMLDivElement> {
	count?: number
	scrollThreshold?: number
}

function useLemonFall(
	containerRef: React.RefObject<HTMLDivElement | null>,
	layerRef: React.RefObject<HTMLDivElement | null>,
	count: number,
	scrollThreshold: number,
) {
	useEffect(() => {
		const container = containerRef.current
		const layer = layerRef.current
		const viewport = document.getElementById('viewport')
		if (!container || !layer || !viewport) return

		let teardown: (() => void) | undefined

		const trySpawn = () => {
			const maxScroll = viewport.scrollHeight - viewport.clientHeight
			if (maxScroll <= 0 || viewport.scrollTop / maxScroll < scrollThreshold) return

			viewport.removeEventListener('scroll', trySpawn)
			requestAnimationFrame(() => requestAnimationFrame(() => {
				teardown = initPhysics(container, layer, count)
			}))
		}

		viewport.addEventListener('scroll', trySpawn, { passive: true })
		trySpawn()

		return () => {
			viewport.removeEventListener('scroll', trySpawn)
			teardown?.()
		}
	}, [containerRef, layerRef, count, scrollThreshold])
}

export default function LemonFall({
	count = 10,
	scrollThreshold = 0.9,
	className,
	children,
	...props
}: LemonFallProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const layerRef = useRef<HTMLDivElement>(null)

	useLemonFall(containerRef, layerRef, count, scrollThreshold)

	return (
		<div
			ref={containerRef}
			className={clsx('relative overflow-hidden pointer-events-none min-h-[50vh]', className)}
			{...props}
		>
			{children && (
				<div className='relative z-0 pointer-events-auto'>{children}</div>
			)}
			<div
				ref={layerRef}
				className='absolute inset-0 z-10 touch-none pointer-events-none overflow-hidden'
				aria-hidden='true'
			/>
		</div>
	)
}
