import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	Dialog,
	Grid2,
	IconButton,
	Typography,
} from '@mui/material'
import { forwardRef, memo } from 'react'
import ReactTelegramEmoji from 'react-telegram-emoji-main'
import { emoji_data } from 'react-telegram-emoji-main/emoji_data'
import { FixedSizeGrid } from 'react-window'
import { theme } from 'utils/tg'

type Props = {
	open: boolean
	onClick: (emoji: string) => void
	onClose: () => void
}

const GUTTER_SIZE = 5

export const EmojiList = memo(({ open, onClick, onClose }: Props) => {
	const getEmoji = (rowIndex: number, columnIndex: number) => {
		return Object.keys(emoji_data)[rowIndex * 8 + columnIndex]
	}

	const handleClick = (emoji: string) => {
		onClick(emoji)
	}

	const Emoji = ({ columnIndex, rowIndex, style }: any) => (
		<div
			style={{
				...style,
				left: style.left + GUTTER_SIZE,
				top: style.top + GUTTER_SIZE,
				width: style.width - GUTTER_SIZE,
				height: style.height - GUTTER_SIZE,
				cursor: 'pointer',
			}}
			onClick={() => handleClick(getEmoji(rowIndex, columnIndex))}
		>
			<ReactTelegramEmoji
				width={style.width - GUTTER_SIZE}
				src={getEmoji(rowIndex, columnIndex)}
			/>
		</div>
	)

	return (
		<Dialog open={open} onClose={onClose}>
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
					<FixedSizeGrid
						className='Grid'
						innerElementType={innerElementType}
						columnCount={7}
						columnWidth={35}
						height={260}
						rowCount={Math.ceil(Object.keys(emoji_data).length / 7)}
						rowHeight={35}
						width={260}
					>
						{Emoji}
					</FixedSizeGrid>
				</Grid2>
				<Button variant='text' sx={{ mt: 2 }} fullWidth onClick={onClose}>
					Отмена
				</Button>
			</Box>
		</Dialog>
	)
})

const innerElementType = forwardRef<
	HTMLDivElement,
	{ style: React.CSSProperties }
>(({ style, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			...style,
			paddingLeft: GUTTER_SIZE,
			paddingTop: GUTTER_SIZE,
		}}
		{...rest}
	/>
))
