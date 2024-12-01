import { Divider, Stack } from '@mui/material'
import { PATHS } from 'app/PATHS'
import { deleteDigestTC, DigestType } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Digest } from 'common/components/Digest/Digest'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'utils/tg'

type Props = {
	digests: DigestType[]
}

export const DigestList = memo(({ digests }: Props) => {
	const navigate = useNavigate()

	const channels = useAppSelector(state => state.channels)

	const dispatch = useAppDispatch()

	return (
		<Stack divider={<Divider color={theme.section_separator_color} />}>
			{digests.map(digest => {
				const onClickHandler = () =>
					navigate(PATHS.digestPage.replace(':digestId', digest.id))

				const onDeleteHandler = () => {
					dispatch(deleteDigestTC(digest.id))
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
