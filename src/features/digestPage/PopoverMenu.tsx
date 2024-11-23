import AddSharpIcon from '@mui/icons-material/AddSharp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import TuneSharpIcon from '@mui/icons-material/TuneSharp'
import { Grid2, Popover, Typography } from '@mui/material'
import { PATHS } from 'app/PATHS'
import { deleteDigestTC } from 'app/store/digestsReducer'
import { useAppDispatch } from 'app/store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { theme } from 'utils/tg'

type Props = {
	anchorElement: HTMLButtonElement | null
	setAnchorEl: (arg: HTMLButtonElement | null) => void
}

export const PopoverMenu = ({ anchorElement, setAnchorEl }: Props) => {
	const { digestId = '' } = useParams()

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const menuButtons = [
		{
			onClick: () => {
				navigate(PATHS.addChannel.replace(':digestId', digestId))
			},
			color: theme.text_color,
			icon: <AddSharpIcon fontSize='small' />,
			text: 'Добавить канал',
		},
		{
			onClick: () => {
				navigate(PATHS.digestSettingsPage.replace(':digestId', digestId))
			},
			color: theme.text_color,
			icon: <TuneSharpIcon fontSize='small' />,
			text: 'Настройки',
		},
		{
			onClick: () => {
				dispatch(deleteDigestTC(digestId))
				navigate(PATHS.profilePage)
			},
			color: theme.destructive_text_color,
			icon: <DeleteOutlineOutlinedIcon fontSize='small' />,
			text: 'Удалить дайджест',
		},
	]

	const renderedButtons = menuButtons.map((button, index) => (
		<Grid2
			key={index}
			container
			alignItems={'center'}
			gap={'10px'}
			paddingY={'5px'}
			color={button.color}
			onClick={button.onClick}
			sx={{
				cursor: 'pointer',
			}}
		>
			{button.icon}
			<Typography fontSize={'14px'} color='inherit'>
				{button.text}
			</Typography>
		</Grid2>
	))

	const handleClosePopover = () => {
		setAnchorEl(null)
	}

	return (
		<Popover
			open={!!anchorElement}
			anchorEl={anchorElement}
			onClose={handleClosePopover}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<Grid2
				container
				direction={'column'}
				padding={'2px 10px'}
				minWidth={'200px'}
			>
				{renderedButtons}
			</Grid2>
		</Popover>
	)
}
