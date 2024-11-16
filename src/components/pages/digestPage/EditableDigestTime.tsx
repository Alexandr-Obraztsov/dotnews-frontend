import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { Grid2, Typography } from '@mui/material'
import dayjs from 'dayjs'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { tg } from '../../../globalTheme'
import { useAppSelector } from '../../../store/hooks'
import { daysOptions } from '../digestSettingsPage/DigestSettingsPage'

type EditableDigestTimePropsType = {
	onClick?: () => void
}

export const EditableDigestTime: React.FC<EditableDigestTimePropsType> = ({
	onClick,
}) => {
	const { digestId = '' } = useParams()

	const digest = useAppSelector(state => state.digests).find(
		digest => digest.id === digestId
	)!

	const receptionTime = dayjs(digest.receptionTime, 'HH:mm:ss').format('HH:mm')

	const timeInterval =
		daysOptions[
			+dayjs(digest.timeInterval, 'D.HH:mm:ss').format(
				'D'
			) as keyof typeof daysOptions
		]

	return (
		<Grid2
			container
			onClick={onClick}
			marginTop={'5px'}
			marginBottom={'10px'}
			position={'relative'}
			fontSize={'16px'}
			color={tg.themeParams.subtitle_text_color}
			gap={'4px'}
			marginLeft={'10px'}
			sx={{
				cursor: 'pointer',
			}}
		>
			<Typography fontWeight={400} lineHeight={'normal'} fontSize={'inherit'}>
				{timeInterval} в {receptionTime}
			</Typography>
			<AccessAlarmIcon fontSize={'inherit'} />
		</Grid2>
	)
}
