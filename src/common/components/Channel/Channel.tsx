// @flow
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Avatar, Grid2, IconButton, SxProps, Typography } from '@mui/material'
import { ChannelType } from 'app/store/channelsReducer'
import { ScrollableItem } from 'common/components/ScrollableItem/ScrollableItem'
import { theme } from 'utils/tg'
type ChannelPropsType = {
	channel: ChannelType
	bgcolor?: string
	onDelete?: () => void
	onClick?: () => void
	sx?: SxProps
}

export const Channel = ({
	channel,
	onDelete,
	onClick,
	bgcolor,
	sx,
}: ChannelPropsType) => {
	return (
		<ScrollableItem onDelete={onDelete} bgcolor={bgcolor} onClick={onClick}>
			<Grid2
				container
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				wrap={'nowrap'}
				width={'100%'}
				zIndex={2}
			>
				<Grid2
					container
					direction={'row'}
					alignItems={'center'}
					wrap={'nowrap'}
				>
					<Avatar src={channel.imageUrl} sx={{ width: 38, height: 38 }} />

					<Grid2
						container
						direction={'column'}
						marginLeft={'10px'}
						gap={'2px'}
						alignItems={'flex-start'}
						justifyContent={'center'}
					>
						<Typography
							fontSize={'18px'}
							fontWeight={400}
							lineHeight={'normal'}
							color={theme.text_color}
							whiteSpace={'nowrap'}
							textOverflow={'ellipsis'}
							overflow={'hidden'}
							maxWidth={'100%'}
							sx={{
								userSelect: 'none',
							}}
						>
							{channel.title}
						</Typography>

						<Typography
							color={'text.secondary'}
							fontSize={'13px'}
							fontWeight={400}
							lineHeight={'13px'}
							sx={{
								userSelect: 'none',
							}}
						>
							@{channel.telegramName}
						</Typography>
					</Grid2>
				</Grid2>

				{onDelete && (
					<IconButton
						sx={{
							fontSize: '12px',
							color: theme.subtitle_text_color,
						}}
					>
						<ArrowBackIosIcon fontSize={'inherit'} />
					</IconButton>
				)}
			</Grid2>
		</ScrollableItem>
	)
}
