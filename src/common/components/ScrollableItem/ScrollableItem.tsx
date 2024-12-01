import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { theme } from 'utils/tg'
import { BasicItem } from './BasicItem'

type ItemPropsType = {
	onClick?: () => void
	onDelete?: () => void
	children?: React.ReactNode
	bgcolor?: string
}

export const ScrollableItem = ({
	children,
	onDelete,
	onClick,
	bgcolor,
}: ItemPropsType) => {
	const [transformX, setTransformX] = useState<number>(0)
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [isPressed, setIsPressed] = useState<boolean>(false) // Новый флаг
	const stoppedX = 75
	let startX = 0
	let offset = 0

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		startX = event.changedTouches[0].clientX
		offset = transformX
		setIsPressed(true)
		setIsDragging(false)
		window.addEventListener('touchmove', handleTouchMove)
		window.addEventListener('touchend', handleTouchEnd)
	}

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		startX = event.clientX
		offset = transformX
		setIsPressed(true)
		setIsDragging(false)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
	}

	const handleTouchMove = (event: TouchEvent) => {
		const deltaX = event.changedTouches[0].clientX - startX
		offset = transformX + deltaX
		if (Math.abs(deltaX) > 5) setIsDragging(true)
		setTransformX(offset < 0 ? offset : 0)
	}

	const handleMouseMove = (event: MouseEvent) => {
		const deltaX = event.clientX - startX
		offset = transformX + deltaX
		if (Math.abs(deltaX) > 5) setIsDragging(true)
		setTransformX(offset < 0 ? offset : 0)
	}

	const handleTouchEnd = (ev: TouchEvent) => {
		setTransformX(offset <= -stoppedX ? -stoppedX : 0)
		setIsPressed(false)
		window.removeEventListener('touchmove', handleTouchMove)
		window.removeEventListener('touchend', handleTouchEnd)
	}

	const handleMouseUp = (ev: MouseEvent) => {
		setTransformX(offset <= -stoppedX ? -stoppedX : 0)
		setIsPressed(false)
		window.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('mouseup', handleMouseUp)
	}

	return (
		<Box overflow={'hidden'} position={'relative'} sx={{ userSelect: 'none' }}>
			<Box
				bgcolor={theme.destructive_text_color}
				position={'absolute'}
				top={0}
				right={0}
				bottom={0}
				left={0}
				zIndex={0}
				display={'flex'}
				justifyContent={'end'}
				paddingRight={'25px'}
				alignItems={'center'}
				onClick={onDelete}
			>
				<DeleteIcon />
			</Box>
			<BasicItem
				bgcolor={bgcolor}
				onTouchStart={onDelete && handleTouchStart}
				onMouseDown={onDelete && handleMouseDown}
				transform={`translateX(${transformX}px)`}
				isPressed={isPressed}
				onClick={!isDragging ? onClick : undefined}
			>
				{children}
			</BasicItem>
		</Box>
	)
}
