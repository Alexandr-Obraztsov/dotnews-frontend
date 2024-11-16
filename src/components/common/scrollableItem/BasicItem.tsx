import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'
import { globalTheme } from '../../../utils/theme'

type BasicItemPropsType = BoxProps & {
	transform?: string
	isDragging?: boolean
}

export const BasicItem: FC<BasicItemPropsType> = ({
	isDragging,
	transform,
	children,
	...props
}) => {
	return (
		<Box
			{...props}
			position={'relative'}
			display={'flex'}
			padding={'15px 20px'}
			alignItems={'center'}
			bgcolor={globalTheme.palette.background.paper}
			overflow={'hidden'}
			sx={{
				transform: transform,
				transition: isDragging ? 'none' : 'transform 0.3s ease',
				cursor: isDragging ? 'grab' : 'pointer',
				pointerEvents: 'all',
			}}
		>
			{children}
		</Box>
	)
}
