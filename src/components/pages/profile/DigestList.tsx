import { Divider, Stack } from '@mui/material'
import * as React from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/PATHS'
import { deleteDigestAC } from '../../../store/digestsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { tg } from '../../../utils/tg'
import { Digest } from '../../common/digest/Digest'

export const DigestList: React.FC = memo(() => {
	const navigate = useNavigate()

	const digests = useAppSelector(state => state.digests)
	const channels = useAppSelector(state => state.channels)

	const dispatch = useAppDispatch()

	return (
		<Stack
			divider={<Divider color={tg.themeParams.section_separator_color} />}
			bgcolor={tg.themeParams.bg_color}
		>
			{digests.map(digest => {
				const onClickHandler = () =>
					navigate(PATHS.digestPage.replace(':digestId', digest.id))

				const onDeleteHandler = () => {
					api.deleteUserDigest({
						userTelegramId: tg.initDataUnsafe.user!.id,
						digestId: digest.id,
					})
					dispatch(deleteDigestAC(digest.id))
				}

				const digestChannels = channels[digest.id]

				return (
					<Digest
						key={digest.id}
						digest={digest}
						channels={digestChannels.slice(0, 3)}
						onClick={onClickHandler}
						onDelete={onDeleteHandler}
					/>
				)
			})}
		</Stack>
	)
})
