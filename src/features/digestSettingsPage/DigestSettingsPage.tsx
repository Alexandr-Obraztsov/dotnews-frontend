import AddReactionIcon from '@mui/icons-material/AddReaction'
import { Box, Grid2, TextField, Typography } from '@mui/material'
import { updateDigestTC } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Header } from 'common/components'
import { EmojiList } from 'common/components/EmojiList/EmojiList'
import dayjs from 'dayjs'
import { useCallback, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactTelegramEmoji from 'react-telegram-emoji-main'
import { theme } from 'utils/tg'
import { WheelWidget } from './WheelWidget/WheelWidget'

export const daysOptions = {
	1: 'Ежедневно',
	2: 'Каждые 2 дня',
	3: 'Каждые 3 дня',
	4: 'Каждые 4 дня',
	5: 'Каждые 5 дней',
	6: 'Каждые 6 дней',
	7: 'Eженедельно',
}

const MAX_NAME_LENGTH = 25

export const DigestSettingsPage = () => {
	const [emojiDialogOpen, setEmojiDialogOpen] = useState<boolean>(false)

	const digestId = useParams().digestId

	const digests = useAppSelector(state => state.digests)

	const digest = digests.find(digest => digest.id === digestId)!

	const timeRef = useRef({
		hours: +dayjs(digest.receptionTime, 'HH:mm:ss').format('HH'),
		minutes: +dayjs(digest.receptionTime, 'HH:mm:ss').format('mm'),
		timeInterval: +dayjs(digest.timeInterval, 'D.HH:mm:ss').format('D'),
	})

	const [emoji, setEmoji] = useState(digest.emoji)

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const [digestName, setDigestName] = useState(digest.name)

	const [error, setError] = useState('')

	const handleClickChangeEmoji = () => {
		setEmojiDialogOpen(true)
	}

	const handleClickEmoji = (emoji: string) => {
		setEmoji(emoji)
		setEmojiDialogOpen(false)
	}

	const convertNumberToTime = useCallback((relative: number) => {
		return relative < 10 ? `0${relative}` : `${relative}`
	}, [])

	const handleSave = () => {
		const interval = `${timeRef.current.timeInterval}.00:00:00`
		const time = `${convertNumberToTime(
			timeRef.current.hours
		)}:${convertNumberToTime(timeRef.current.minutes)}:00`
		navigate(-1)

		const newDigest = {
			...digest,
			name: digestName,
			receptionTime: time,
			emoji,
			timeInterval: interval,
		}
		dispatch(updateDigestTC(newDigest))
	}

	const handleChangeDigestName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value.length > MAX_NAME_LENGTH + 1) return
		checkName(value)
		setDigestName(e.target.value)
	}

	const checkName = (name: string) => {
		if (digests.find(digest => digest.name === name.trim())) {
			setError('Такое имя уже существует')
		} else if (name.length > MAX_NAME_LENGTH) {
			setError('Название слишком длинное')
		} else if (name.trim().length < 3) {
			setError('Название слишком короткое')
		} else if (/[,.!?:;.}{[\]\/\\@]/.test(name)) {
			setError('Название содержит запрещенные символы')
		} else {
			setError('')
		}
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
					<ReactTelegramEmoji src={emoji} width={60} />
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
					error={!!error}
					helperText={error}
					onChange={handleChangeDigestName}
					sx={{
						flexGrow: 1,
						'.MuiFormHelperText-root': {
							textAlign: 'center',
						},
						input: {
							textAlign: 'center',
							fontSize: '18px',
							fontWeight: 500,
						},
					}}
				/>
			</Grid2>

			<WheelWidget timeRef={timeRef} />

			<EmojiList
				open={emojiDialogOpen}
				onClick={handleClickEmoji}
				onClose={() => setEmojiDialogOpen(false)}
			/>
		</Grid2>
	)
}
