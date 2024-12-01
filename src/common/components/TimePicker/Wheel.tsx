import {
	KeenSliderOptions,
	TrackDetails,
	useKeenSlider,
} from 'keen-slider/react'
import React, { memo, useRef } from 'react'
import { hexToRgba } from '../../../utils/hexToRgba'
import { tg } from '../../../utils/tg'
import './styles.css'

export const Wheel = memo(
	(props: {
		initIdx?: number
		label?: string
		length: number
		loop?: boolean
		slidesPerView?: number
		perspective?: 'left' | 'right' | 'center'
		setValue?: (relative: number, absolute: number) => string
		width: number
		wheelSize?: number
		onChange?: (relative: number) => void
		slideStyle?: React.CSSProperties
	}) => {
		const lastValue = useRef(0)
		const perspective = props.perspective || 'center'
		const wheelSize = props.wheelSize || 10
		const slides = props.length
		const slideDegree = 360 / wheelSize
		const slidesPerView = props.loop ? props.slidesPerView || 3 : 1
		const [sliderState, setSliderState] = React.useState<TrackDetails | null>(
			null
		)
		const size = useRef(0)
		const options = useRef<KeenSliderOptions>({
			slides: {
				number: slides,
				origin: props.loop ? 'center' : 'auto',
				perView: slidesPerView,
			},

			vertical: true,

			initial: props.initIdx || 0,
			loop: props.loop,
			dragSpeed: val => {
				const height = size.current
				return (
					val *
					(height /
						((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
						slidesPerView)
				)
			},
			created: s => {
				size.current = s.size
			},
			updated: s => {
				size.current = s.size
			},
			detailsChanged: s => {
				setSliderState(s.track.details)
			},
			rubberband: !props.loop,
			mode: 'free-snap',
		})

		const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current)

		const [radius, setRadius] = React.useState(0)

		React.useEffect(() => {
			if (slider.current) setRadius(slider.current.size / 2)
		}, [slider])

		function slideValues() {
			let selectId = 0,
				selectRadius = Infinity
			if (!sliderState) return []
			const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

			const values = []
			for (let i = 0; i < slides; i++) {
				const distance = sliderState
					? (sliderState.slides[i].distance - offset) * slidesPerView
					: 0
				const rotate =
					Math.abs(distance) > wheelSize / 2
						? 180
						: distance * (360 / wheelSize) * -1
				if (Math.abs(rotate) < selectRadius) {
					selectId = i
					selectRadius = Math.abs(rotate)
				}
				const style: any = {
					transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
					WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
				}
				const value = props.setValue
					? props.setValue(i, sliderState.abs + Math.round(distance))
					: i
				values.push({ style, value })
			}

			values[selectId].style['fontSize'] = '18px'
			values[selectId].style['filter'] = 'drop-shadow(0 0 3px #757575)'
			if (selectId !== lastValue.current) {
				props.onChange?.(selectId)
				lastValue.current = selectId
			}
			return values
		}

		return (
			<div
				className={'wheel keen-slider wheel--perspective-' + perspective}
				ref={sliderRef}
			>
				<div
					className='wheel__shadow-top'
					style={{
						transform: `translateZ(${radius}px)`,
						WebkitTransform: `translateZ(${radius}px)`,
						background: `linear-gradient(
                        to top,
                    ${hexToRgba(tg.themeParams.bg_color!, 0)} 0%,
                    ${hexToRgba(tg.themeParams.bg_color!, 1)} 80%
                    )`,
					}}
				/>
				<div className='wheel__inner'>
					<div className='wheel__slides' style={{ width: props.width + 'px' }}>
						{slideValues().map(({ style, value }, idx) => (
							<div
								className='wheel__slide'
								style={{ ...style, ...props.slideStyle }}
								key={idx}
							>
								<span>{value}</span>
							</div>
						))}
					</div>
					{props.label && (
						<div
							className='wheel__label'
							style={{
								transform: `translateZ(${radius}px)`,
								WebkitTransform: `translateZ(${radius}px)`,
							}}
						>
							{props.label}
						</div>
					)}
				</div>
				<div
					className='wheel__shadow-bottom'
					style={{
						transform: `translateZ(${radius}px)`,
						WebkitTransform: `translateZ(${radius}px)`,
						background: `linear-gradient(to bottom,
                    ${hexToRgba(tg.themeParams.bg_color!, 0)} 0%,
                    ${hexToRgba(tg.themeParams.bg_color!, 1)} 80%
                    )`,
					}}
				/>
			</div>
		)
	}
)
