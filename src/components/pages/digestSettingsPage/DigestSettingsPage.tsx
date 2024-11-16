import { Grid2, Typography } from '@mui/material'
import dayjs from 'dayjs'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/PATHS'
import { tg } from '../../../globalTheme'
import { deleteDigestAC, updateDigestAC } from '../../../store/digestsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Wheel } from '../../common/TimePicker/Wheel'

export const daysOptions = {
	1: 'Ежедневно',
	2: 'Каждые 2 дня',
	3: 'Каждые 3 дня',
	4: 'Каждые 4 дня',
	5: 'Каждые 5 дней',
	6: 'Каждые 6 дней',
	7: 'Eженедельно',
}

export const DigestSettingsPage: React.FC = () => {
	const { digestId = '' } = useParams()

	const digest = useAppSelector(state => state.digests).find(
		dg => dg.id === digestId
	)!

	const [receptionTime, setReceptionTime] = useState({
		hours: +dayjs(digest.receptionTime, 'HH:mm:ss').format('HH'),
		minutes: +dayjs(digest.receptionTime, 'HH:mm:ss').format('mm'),
	})

	const [timeInterval, setTimeInterval] = useState(
		+dayjs(digest.timeInterval, 'D.HH:mm:ss').format('D')
	)

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

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

	const handleSave = () => {
		const interval = `${timeInterval}.00:00:00`
		const time = `${convertNumberToTime(
			receptionTime.hours
		)}:${convertNumberToTime(receptionTime.minutes)}:00`
		navigate(PATHS.digestPage.replace(':digestId', digestId))

		const newDigest = { ...digest, receptionTime: time, timeInterval: interval }
		api.updateDigest(tg.initDataUnsafe.user!.id, newDigest)
		dispatch(updateDigestAC(newDigest))
	}

	const handleDelete = () => {
		api.deleteUserDigest({
			userTelegramId: tg.initDataUnsafe.user!.id,
			digestId: digest.id,
		})
		dispatch(deleteDigestAC(digest.id))
		navigate(PATHS.profile)
	}

	useEffect(() => {
		tg.BackButton.onClick(() =>
			navigate(PATHS.digestPage.replace(':digestId', digestId))
		)
	}, [navigate, digestId])

	return (
		<Grid2
			container
			direction={'column'}
			alignItems={'center'}
			height={'100vh'}
			bgcolor={'background.paper'}
			paddingX={'20px'}
			paddingY={'20px'}
		>
			<Typography fontSize={'24px'} fontWeight={600}>
				{digest.name}
			</Typography>

			<Grid2
				container
				height={'150px'}
				marginTop={'20px'}
				wrap={'nowrap'}
				position={'relative'}
				alignItems={'center'}
				width={'100%'}
				gap={'10px'}
				justifyContent={'center'}
				direction={'row'}
			>
				<Wheel
					loop
					initIdx={timeInterval - 1}
					wheelSize={14}
					slidesPerView={8}
					length={Object.keys(daysOptions).length}
					width={180}
					setValue={convertNumberToInterval}
					onChange={handleUpdateTimeInterval}
					slideStyle={{
						letterSpacing: '-0.5px',
						whiteSpace: 'nowrap',
					}}
				/>
				<Typography zIndex={2} fontSize={'24px'} fontWeight={600}>
					в
				</Typography>
				<Wheel
					loop
					initIdx={receptionTime.hours}
					wheelSize={14}
					slidesPerView={8}
					length={23}
					width={40}
					setValue={convertNumberToTime}
					onChange={handleUpdateHours}
				/>
				<Typography zIndex={2} fontSize={'24px'} fontWeight={600}>
					:
				</Typography>
				<Wheel
					loop
					initIdx={receptionTime.minutes}
					wheelSize={14}
					slidesPerView={8}
					length={30}
					width={40}
					setValue={convertNumberToTime}
					onChange={handleUpdateMinutes}
				/>

				<Grid2
					container
					alignItems={'center'}
					position={'absolute'}
					bgcolor={'background.default'}
					width={'100%'}
					height={'35px'}
					top={'50%'}
					borderRadius={'5px'}
					zIndex={0}
					sx={{
						transform: 'translateY(-50%)',
					}}
				></Grid2>
			</Grid2>

			<Grid2
				container
				alignItems={'center'}
				justifyContent={'center'}
				marginTop={'20px'}
				width={'100%'}
				height={'50px'}
				borderRadius={'5px'}
				bgcolor={'background.default'}
				onClick={handleSave}
			>
				<Typography fontSize={'16px'} fontWeight={400} color={'primary'}>
					Сохранить
				</Typography>
			</Grid2>

			<Grid2
				container
				alignItems={'center'}
				justifyContent={'center'}
				marginTop={'20px'}
				width={'100%'}
				height={'50px'}
				borderRadius={'5px'}
				bgcolor={'background.default'}
				onClick={handleDelete}
			>
				<Typography fontSize={'16px'} fontWeight={400} color={'warning'}>
					Удалить дайджест
				</Typography>
			</Grid2>
		</Grid2>
	)
}
