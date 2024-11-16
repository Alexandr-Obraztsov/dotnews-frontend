import { Divider, Stack } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { tg } from '../../../globalTheme'
import { deleteChannelAC } from '../../../store/channelsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Channel } from '../../common/channel/Channel'

export const ChannelList: React.FC = () => {
	const { digestId = '' } = useParams()

	const channels = useAppSelector(state => state.channels[digestId])

	const dispatch = useAppDispatch()

	return (
		<Stack
			divider={<Divider color={tg.themeParams.section_separator_color} />}
			bgcolor={tg.themeParams.bg_color}
		>
			{channels.map(channel => {
				const onDeleteHandler = () => {
					dispatch(deleteChannelAC({ digestId, channel }))
					api.deleteDigestChannel({
						telegramId: tg.initDataUnsafe.user!.id,
						digestId,
						channelId: channel.id,
					})
				}

				return (
					<Channel key={channel.id} {...channel} onDelete={onDeleteHandler} />
				)
			})}
		</Stack>
	)
}
