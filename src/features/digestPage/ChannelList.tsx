import { Divider, Stack } from '@mui/material'
import { api } from 'app/api'
import { deleteChannelAC } from 'app/store/channelsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Channel } from 'common/components'
import { useParams } from 'react-router-dom'
import { tg } from 'utils/tg'

export const ChannelList = () => {
	const { digestId = '' } = useParams()

	const channels = useAppSelector(state => state.channels[digestId])

	const dispatch = useAppDispatch()

	return (
		<Stack divider={<Divider color={tg.themeParams.section_separator_color} />}>
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
					<Channel
						key={channel.id}
						channel={channel}
						onDelete={onDeleteHandler}
					/>
				)
			})}
		</Stack>
	)
}
