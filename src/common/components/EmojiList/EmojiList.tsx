import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	Dialog,
	Grid2,
	IconButton,
	Typography,
} from '@mui/material'
import { useMemo } from 'react'
import ReactTelegramEmoji from 'react-telegram-emoji-main'
import { emoji_data } from 'react-telegram-emoji-main/emoji_data'
import { theme } from 'utils/tg'
type Props = {
	open: boolean
	onClick: (emoji: string) => void
	onClose: () => void
}

export const EmojiList = ({ open, onClick, onClose }: Props) => {
	const emojies = useMemo(
		() =>
			Object.keys(emoji_data).map(emoji => (
				<Box
					key={emoji}
					onClick={() => onClick(emoji)}
					sx={{ cursor: 'pointer' }}
				>
					<ReactTelegramEmoji src={emoji} width={30} />
				</Box>
			)),
		[]
	)

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<Box padding={'10px'} bgcolor={theme.bg_color}>
				<Grid2 container justifyContent={'space-between'} alignItems={'center'}>
					<Typography fontSize={'20px'} fontWeight={500}>
						Выберите эмоджи
					</Typography>

					<IconButton sx={{ color: theme.text_color }} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Grid2>
				<Grid2
					container
					display={'grid'}
					width={'100%'}
					gridTemplateColumns={'repeat(auto-fill, minmax(30px, 1fr))'}
					justifyContent={'center'}
					bgcolor={theme.secondary_bg_color}
					borderRadius={'5px'}
					gap={'10px'}
					padding={'5px'}
					maxHeight={'50vh'}
					overflow={'auto'}
					mt={1}
				>
					{emojies}
				</Grid2>
				<Button variant='text' sx={{ mt: 2 }} fullWidth onClick={onClose}>
					Отмена
				</Button>
			</Box>
		</Dialog>
	)
}
