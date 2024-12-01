import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'
import { theme } from 'utils/tg'

type BasicItemPropsType = BoxProps & {
	transform?: string
	isPressed?: boolean
}

export const BasicItem: FC<BasicItemPropsType> = ({
	isPressed,
	transform,
	children,
	...props
}) => {
	return (
		<Box
			position={'relative'}
			display={'flex'}
			padding={'15px 20px'}
			alignItems={'center'}
			overflow={'hidden'}
			bgcolor={theme.bg_color}
			sx={{
				transform: transform,
				transition: isPressed ? 'none' : 'transform 0.3s ease',
				cursor: isPressed ? 'grab' : 'pointer',
				pointerEvents: 'all',
				'&:hover::before': {
					cursor: 'pointer',
					content: '""',
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					bgcolor: theme.bg_color,
					filter: 'brightness(1.2)',
				},
			}}
			{...props}
		>
			{children}
		</Box>
	)
}
