import React, {FC, useState} from "react";
import {Box, BoxProps} from "@mui/material";
import {BasicItem} from "./BasicItem";
import DeleteIcon from '@mui/icons-material/Delete';


type ItemPropsType = BoxProps & {
    onDelete?: () => void
    children?: React.ReactNode
}

export const ScrollableItem: FC<ItemPropsType> = ({children, onDelete, ...props}) => {

    const [transformX, setTransformX] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const stoppedX = 75
    let startX = 0
    let offset = 0

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        startX = event.changedTouches[0].clientX
        offset = transformX
        setIsDragging(true)
        window.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("touchend", handleTouchEnd)
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        startX = event.clientX
        offset = transformX
        setIsDragging(true)
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("mousemove", handleMouseMove)
    }

    const handleTouchMove = (event: TouchEvent) => {
        const deltaX = event.changedTouches[0].clientX - startX;
        offset = transformX + deltaX;
        setTransformX(offset < 0 ? offset : 0);

    }

    const handleMouseMove = (event: MouseEvent) => {
        const deltaX = event.clientX - startX;
        offset = transformX + deltaX;
        setTransformX(offset < 0 ? offset : 0);
    }

    const handleTouchEnd = () => {
        setTransformX(offset <= -stoppedX ? -stoppedX : 0)
        setIsDragging(false)
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
    }

    const handleMouseUp = () => {
        setTransformX(offset <= -stoppedX ? -stoppedX : 0)
        setIsDragging(false)
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    return (
        <Box
            overflow={"hidden"}
            position={"relative"}
        >
            <Box
                bgcolor={"error.main"}
                position={"absolute"}
                top={0}
                right={0}
                bottom={0}
                left={0}
                zIndex={0}
                display={"flex"}
                justifyContent={"end"}
                paddingRight={"25px"}
                alignItems={"center"}
                onClick={onDelete}
            >
                <DeleteIcon/>
            </Box>
            <BasicItem
                onTouchStart={onDelete && handleTouchStart}
                onMouseDown={onDelete && handleMouseDown}

                transform={`translateX(${transformX}px)`}
                isDragging={isDragging}
                {...props}

            >
                {children}
            </BasicItem>
        </Box>
    )
}