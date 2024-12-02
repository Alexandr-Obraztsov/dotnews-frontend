import { Grid2, Typography } from '@mui/material'
import { Wheel } from 'common/components/TimePicker/Wheel'
import { useCallback } from 'react'
import { theme } from 'utils/tg'
import { daysOptions } from '../DigestSettingsPage'

type Props = {
	timeRef: React.MutableRefObject<{
		hours: number
		minutes: number
		timeInterval: number
	}>
}

export const WheelWidget = ({ timeRef }: Props) => {
	const convertNumberToInterval = useCallback((relative: number) => {
		return Object.values(daysOptions)[relative]
	}, [])

	const handleUpdateHours = useCallback(
		(hours: number) => {
			timeRef.current.hours = hours
		},
		[timeRef]
	)

	const handleUpdateMinutes = useCallback(
		(minutes: number) => {
			timeRef.current.minutes = minutes
		},
		[timeRef]
	)

	const handleUpdateTimeInterval = useCallback(
		(value: number) => {
			const interval = +Object.keys(daysOptions)[value]
			timeRef.current.timeInterval = interval
		},
		[timeRef]
	)

	const convertNumberToTime = useCallback((relative: number) => {
		return relative < 10 ? `0${relative}` : `${relative}`
	}, [])

	return (
		<Grid2
			container
			marginX={'auto'}
			boxSizing={'content-box'}
			height={'100px'}
			marginTop={'20px'}
			wrap={'nowrap'}
			position={'relative'}
			alignItems={'center'}
			width={'min-content'}
			padding={'10px 20px'}
			gap={'10px'}
			justifyContent={'center'}
			direction={'row'}
			sx={{
				'&::before': {
					content: "''",
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					border: `2px solid ${theme.accent_text_color}`,
					zIndex: 999,
					pointerEvents: 'none',
					borderRadius: '5px',
				},
			}}
		>
			<Wheel
				loop
				initIdx={timeRef.current.timeInterval - 1}
				wheelSize={10}
				slidesPerView={5}
				length={Object.keys(daysOptions).length}
				width={135}
				setValue={convertNumberToInterval}
				onChange={handleUpdateTimeInterval}
				slideStyle={{
					letterSpacing: '-0.5px',
					whiteSpace: 'nowrap',
				}}
			/>
			<Typography zIndex={2} fontSize={'16px'} fontWeight={400}>
				в
			</Typography>
			<Wheel
				loop
				initIdx={timeRef.current.hours}
				wheelSize={10}
				slidesPerView={5}
				length={23}
				width={30}
				setValue={convertNumberToTime}
				onChange={handleUpdateHours}
			/>
			<Typography zIndex={2} fontSize={'16px'} fontWeight={400}>
				:
			</Typography>
			<Wheel
				loop
				initIdx={timeRef.current.minutes}
				wheelSize={10}
				slidesPerView={5}
				length={60}
				width={30}
				setValue={convertNumberToTime}
				onChange={handleUpdateMinutes}
			/>
		</Grid2>
	)
}
