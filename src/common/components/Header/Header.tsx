import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid2, IconButton, SxProps } from '@mui/material'
import { memo, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'utils/tg'
type Props = {
	title: ReactNode
	backButton?: ReactNode
	startSlot?: ReactNode
	endSlot?: ReactNode
	sx?: SxProps
}

export const Header = memo(
	({ title, backButton, endSlot, startSlot, sx }: Props) => {
		const navigate = useNavigate()

		const handleClickBack = () => navigate(-1)

		startSlot =
			startSlot || backButton ? (
				<IconButton size='medium' color='inherit' onClick={handleClickBack}>
					<ArrowBackIcon color='inherit' fontSize='medium' />
				</IconButton>
			) : undefined

		return (
			<Grid2
				container
				padding={'10px'}
				gap={'10px'}
				justifyContent={'space-between'}
				alignItems={'center'}
				direction={'row'}
				wrap='nowrap'
				bgcolor={theme.secondary_bg_color}
				color={theme.subtitle_text_color}
				sx={sx}
			>
				<Grid2
					container
					flexGrow={1}
					wrap='nowrap'
					alignItems='center'
					gap={'10px'}
					direction={'row'}
				>
					{startSlot}
					{title}
				</Grid2>
				{endSlot}
			</Grid2>
		)
	}
)
