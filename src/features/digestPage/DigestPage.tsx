import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid2, IconButton, Typography } from '@mui/material'
import { PATHS } from 'app/PATHS'
import { useAppSelector } from 'app/store/hooks'
import { Header } from 'common/components'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactTelegramEmoji from 'react-telegram-emoji-main'
import { getDigestTime } from 'utils/getDigestTime'
import { theme } from 'utils/tg'
import { ChannelList } from './ChannelList'
import { PopoverMenu } from './PopoverMenu'

export const DigestPage = () => {
	const digestId = useParams().digestId

	const navigate = useNavigate()

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const digest = useAppSelector(state => state.digests).find(
		digest => digest.id === digestId
	)!

	const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event?.currentTarget.parentElement as HTMLButtonElement)
	}

	const handleClickHeader = () => {
		navigate(PATHS.digestSettingsPage.replace(':digestId', digest.id))
	}

	return (
		<Grid2
			container
			direction={'column'}
			wrap={'nowrap'}
			paddingBottom={'10px'}
			minHeight={'100vh'}
			bgcolor={theme.bg_color}
		>
			<Header
				backButton
				title={
					<Grid2
						container
						gap={'10px'}
						direction={'row'}
						alignItems={'center'}
						onClick={handleClickHeader}
						sx={{ cursor: 'pointer' }}
					>
						<ReactTelegramEmoji src={digest.emoji} width={40} />
						<Grid2 container direction={'column'}>
							<Typography
								fontWeight={500}
								color={theme.text_color}
								fontSize={'16px'}
								lineHeight={'normal'}
							>
								{digest.name}
							</Typography>

							<Typography
								color={theme.subtitle_text_color}
								fontSize={'14px'}
								lineHeight={'normal'}
							>
								{getDigestTime(digest)}
							</Typography>
						</Grid2>
					</Grid2>
				}
				endSlot={
					<IconButton size='medium' color='inherit' onClick={handleClickMore}>
						<MoreVertIcon color='inherit' fontSize='medium' />
					</IconButton>
				}
			/>
			<PopoverMenu anchorElement={anchorEl} setAnchorEl={setAnchorEl} />
			<ChannelList />
		</Grid2>
	)
}
