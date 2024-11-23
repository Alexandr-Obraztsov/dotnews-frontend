import AddReactionIcon from '@mui/icons-material/AddReaction'
import { Box, Grid2, TextField, Typography } from '@mui/material'
import { api } from 'app/api'
import { updateDigestAC } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Header } from 'common/components'
import { Wheel } from 'common/components/TimePicker/Wheel'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactTelegramEmoji from 'react-telegram-emoji-main'
import { tg, theme } from 'utils/tg'

export const daysOptions = {
	1: 'Ежедневно',
	2: 'Каждые 2 дня',
	3: 'Каждые 3 дня',
	4: 'Каждые 4 дня',
	5: 'Каждые 5 дней',
	6: 'Каждые 6 дней',
	7: 'Eженедельно',
}

export const DigestSettingsPage = () => {
	const { digestId = '' } = useParams()

	const digest = useAppSelector(state => state.digests).find(
		dg => dg.id === digestId
	)!

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const [digestName, setDigestName] = useState(digest.name)

	const [receptionTime, setReceptionTime] = useState({
		hours: +dayjs(digest.receptionTime, 'HH:mm:ss').format('HH'),
		minutes: +dayjs(digest.receptionTime, 'HH:mm:ss').format('mm'),
	})

	const [timeInterval, setTimeInterval] = useState(
		+dayjs(digest.timeInterval, 'D.HH:mm:ss').format('D')
	)

	const convertNumberToTime = useCallback((relative: number) => {
		return relative < 10 ? `0${relative}` : `${relative}`
	}, [])

	const convertNumberToInterval = useCallback((relative: number) => {
		return Object.values(daysOptions)[relative]
	}, [])

	const handleUpdateHours = useCallback((hours: number) => {
		setReceptionTime(prev => ({ ...prev, hours }))
	}, [])

	const handleUpdateMinutes = useCallback((minutes: number) => {
		setReceptionTime(prev => ({ ...prev, minutes }))
	}, [])

	const handleUpdateTimeInterval = useCallback((value: number) => {
		const interval = Object.keys(daysOptions)[value]
		setTimeInterval(+interval)
	}, [])

	const handleClickChangeEmoji = () => {}

	const handleSave = () => {
		const interval = `${timeInterval}.00:00:00`
		const time = `${convertNumberToTime(
			receptionTime.hours
		)}:${convertNumberToTime(receptionTime.minutes)}:00`
		navigate(-1)

		const newDigest = { ...digest, receptionTime: time, timeInterval: interval }
		api.updateDigest(tg.initDataUnsafe.user!.id, newDigest)
		dispatch(updateDigestAC(newDigest))
	}

	return (
		<Grid2
			container
			minHeight={'100vh'}
			bgcolor={theme.bg_color}
			direction={'column'}
		>
			<Header
				sx={{
					backgroundColor: theme.secondary_bg_color,
				}}
				title={
					<Typography
						fontWeight={500}
						color={theme.text_color}
						fontSize={'20px'}
						lineHeight={'normal'}
					>
						Настройки
					</Typography>
				}
				backButton
				endSlot={
					<Typography
						onClick={handleSave}
						textTransform={'uppercase'}
						fontWeight={500}
						color={theme.text_color}
						fontSize={'16px'}
						lineHeight={'normal'}
						sx={{ cursor: 'pointer' }}
					>
						Готово
					</Typography>
				}
			/>

			<Grid2
				container
				direction={'column'}
				wrap={'nowrap'}
				marginTop={'20px'}
				paddingX={'20px'}
				alignItems={'center'}
				gap={'10px'}
			>
				<Box
					position={'relative'}
					onClick={handleClickChangeEmoji}
					sx={{ cursor: 'pointer' }}
				>
					<ReactTelegramEmoji width={60} />
					<AddReactionIcon
						sx={{
							fontSize: '20px',
							color: theme.accent_text_color,
							position: 'absolute',
							bottom: '0px',
							right: '-10px',
						}}
					/>
				</Box>
				<TextField
					variant='standard'
					value={digestName}
					onChange={e => setDigestName(e.target.value)}
					sx={{
						flexGrow: 1,
						input: {
							textAlign: 'center',
							fontSize: '18px',
							fontWeight: 500,
						},
					}}
				/>
			</Grid2>

			<Grid2
				container
				marginX={'auto'}
				boxSizing={'content-box'}
				height={'60px'}
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
					initIdx={timeInterval - 1}
					wheelSize={7}
					slidesPerView={4}
					length={Object.keys(daysOptions).length}
					width={120}
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
					initIdx={receptionTime.hours}
					wheelSize={7}
					slidesPerView={4}
					length={23}
					width={20}
					setValue={convertNumberToTime}
					onChange={handleUpdateHours}
				/>
				<Typography zIndex={2} fontSize={'16px'} fontWeight={400}>
					:
				</Typography>
				<Wheel
					loop
					initIdx={receptionTime.minutes}
					wheelSize={7}
					slidesPerView={4}
					length={60}
					width={20}
					setValue={convertNumberToTime}
					onChange={handleUpdateMinutes}
				/>
			</Grid2>
		</Grid2>
	)
}