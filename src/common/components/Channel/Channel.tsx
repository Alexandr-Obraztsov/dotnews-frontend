// @flow
import { Avatar, Grid2, SxProps, Typography } from '@mui/material'
import { ChannelType } from 'app/store/channelsReducer'
import { ScrollableItem } from 'common/components/ScrollableItem/ScrollableItem'

type ChannelPropsType = ChannelType & {
	onDelete?: () => void
	onClick?: () => void
	sx?: SxProps
}

export const Channel = ({
	imageUrl,
	title,
	telegramName,
	onDelete,
	onClick,
	sx,
}: ChannelPropsType) => {
	return (
		<ScrollableItem onDelete={onDelete} onClick={onClick} sx={sx}>
			<Avatar src={imageUrl} sx={{ width: 45, height: 45 }} />
			<Grid2
				container
				direction={'column'}
				spacing={0.5}
				marginLeft={'13px'}
				position={'relative'}
			>
				<Typography
					color={'default'}
					fontSize={'16px'}
					fontWeight={500}
					lineHeight={'16px'}
					whiteSpace={'nowrap'}
					textOverflow={'ellipsis'}
					overflow={'hidden'}
					maxWidth={'100%'}
					sx={{
						userSelect: 'none',
					}}
				>
					{title}
				</Typography>

				<Typography
					color={'text.secondary'}
					fontSize={'14px'}
					fontWeight={400}
					lineHeight={'14px'}
					sx={{
						userSelect: 'none',
					}}
				>
					@{telegramName}
				</Typography>
			</Grid2>
		</ScrollableItem>
	)
}
