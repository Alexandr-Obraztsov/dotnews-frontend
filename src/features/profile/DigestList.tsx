import { Divider, Stack } from '@mui/material'
import { api } from 'app/api'
import { PATHS } from 'app/PATHS'
import { deleteDigestAC, DigestType } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Digest } from 'common/components/Digest/Digest'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg, theme } from 'utils/tg'

type Props = {
	digests: DigestType[]
}

export const DigestList = memo(({ digests }: Props) => {
	const navigate = useNavigate()

	const channels = useAppSelector(state => state.channels)

	const dispatch = useAppDispatch()

	return (
		<Stack
			divider={<Divider color={theme.section_separator_color} />}
			bgcolor={theme.secondary_bg_color}
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
