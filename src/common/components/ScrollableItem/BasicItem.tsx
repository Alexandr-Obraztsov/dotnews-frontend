import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'
import { theme } from 'utils/tg'

type BasicItemPropsType = BoxProps & {
	transform?: string
	bgcolor?: string
	isPressed?: boolean
}

export const BasicItem: FC<BasicItemPropsType> = ({
	isPressed,
	transform,
	children,
	bgcolor,
	...props
}) => {
	return (
		<Box
			position={'relative'}
			display={'flex'}
			padding={'15px 20px'}
			alignItems={'center'}
			overflow={'hidden'}
			bgcolor={bgcolor || theme.bg_color}
			sx={{
				transform: transform,
				transition: isPressed ? 'none' : 'transform 0.3s ease',
				cursor: isPressed ? 'grab' : 'pointer',
				pointerEvents: 'all',
			}}
			{...props}
		>
			{children}
		</Box>
	)
}
