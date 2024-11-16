import {
	Alert,
	Box,
	Grid2,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/PATHS'
import { addChannelAC, ChannelType } from '../../../store/channelsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { hexToRgba } from '../../../utils/hexToRgba'
import { tg } from '../../../utils/tg'
import { Channel } from '../../common/channel/Channel'
import { LoadingItem } from '../../common/scrollableItem/LoadingItem'

const fetchChannel = (link: string) => {
	return api
		.getChannel(link)
		.then(data => data)
		.catch(er =>
			api
				.addChannel(link)
				.then(data => data)
				.catch(er => Promise.reject('Канал не найден'))
		)
}

type AlertStateType = {
	text: string
	type: 'success' | 'warning'
	timeoutId: NodeJS.Timeout | null
}

export const AddChannel: React.FC = () => {
	const { digestId = '' } = useParams()

	const [link, setLink] = useState<string>('')

	const [alert, setAlert] = useState<AlertStateType>({} as AlertStateType)

	const muiTheme = useTheme()

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const user = useAppSelector(state => state.user)

	const channels = useAppSelector(state => state.channels[digestId])

	const [textFieldTimeoutId, setTextFieldTimeoutId] =
		useState<NodeJS.Timeout | null>(null)

	const { data, isLoading, refetch, isError } = useQuery<ChannelType>(
		'channel' + link,
		() => fetchChannel(link),
		{
			enabled: false,
			retry: false,
			refetchOnWindowFocus: false,
		}
	)

	const handleChannelClick = () => {
		clearTimeout(alert.timeoutId!)
		const timeoutId = setTimeout(() => setAlert({} as AlertStateType), 2000)

		if (!channels.some(c => c.id === data!.id)) {
			api.addDigestChannel({
				telegramId: user.telegramId,
				digestId,
				name: data!.telegramName,
			})
			dispatch(addChannelAC({ digestId, channel: data! }))
			setAlert({
				type: 'success',
				text: data?.title + ' добавлен в список каналов',
				timeoutId,
			})
		} else {
			setAlert({
				text: 'Канал уже добавлен',
				type: 'warning',
				timeoutId,
			})
		}
	}

	const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
		const line = event.currentTarget.value
			.trim()
			.replace('https://t.me/', '')
			.replace('@', '')
		setLink(line)

		clearTimeout(textFieldTimeoutId!)
		const timeoutId = setTimeout(() => refetch(), 300)
		setTextFieldTimeoutId(timeoutId)
	}

	const onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) =>
		event.key === 'Enter' && refetch()

	useEffect(() => {
		tg.BackButton.onClick(() =>
			navigate(PATHS.digestPage.replace(':digestId', digestId))
		)
		tg.BackButton.show()

		tg.MainButton.setParams({ text: 'Готово' })
		tg.MainButton.onClick(() => {
			handleChannelClick()
			navigate(PATHS.digestPage.replace(':digestId', digestId))
		})
		tg.MainButton.show()
	}, [])

	return (
		<Grid2
			container
			direction={'column'}
			alignItems={'center'}
			padding={'50px 0px 20px'}
			height={'100vh'}
		>
			<Typography
				fontSize={'23px'}
				fontWeight={450}
				marginX={'50px'}
				textAlign={'center'}
			>
				Введите ссылку на канал
			</Typography>

			<Box marginTop={'30px'} paddingX={'20px'}>
				<TextField
					value={link}
					variant={'filled'}
					size={'small'}
					fullWidth={true}
					onChange={handleLinkChange}
					onKeyUp={onKeyUpHandler}
					error={isError}
					helperText={isError ? 'Канал не найден' : ' '}
					slotProps={{
						input: {
							startAdornment: <>https://t.me/</>,
						},
					}}
					sx={{
						'& input': {
							padding: '8px',
							paddingLeft: '0',
						},
					}}
				/>
				<Typography
					fontSize={'14px'}
					lineHeight={'18px'}
					fontWeight={400}
					textAlign={'center'}
					color={'text.secondary'}
				>
					Вводить ссылку нужно в следующем формате:
					<span style={{ fontWeight: 'bold' }}> https://t.me/имя_канала </span>,
					<span style={{ fontWeight: 'bold' }}> @имя_канала</span> или
					<span style={{ fontWeight: 'bold' }}> имя_канала</span>
				</Typography>
			</Box>
			<Box marginTop={'20px'} width={'100%'}>
				{isLoading ? (
					<LoadingItem />
				) : (
					data?.title && <Channel {...data} onClick={handleChannelClick} />
				)}
			</Box>
			<Alert
				severity={alert.type || 'success'}
				sx={{
					opacity: alert.text ? 1 : 0,
					position: 'absolute',
					bottom: '10px',
					width: 'calc(100% - 40px)',
					transition: 'opacity 0.2s ease',
					backgroundColor:
						alert.type === 'success'
							? hexToRgba(muiTheme.palette.success.main, 0.2)
							: hexToRgba(muiTheme.palette.warning.main, 0.2),
				}}
			>
				{alert.text}
			</Alert>
		</Grid2>
	)
}
