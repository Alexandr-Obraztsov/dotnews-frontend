import React, {FC, useState} from "react";
import {Avatar, Box, Grid2, Typography} from "@mui/material";
import {BasicItem} from "../../styled/BasicItem";
import DeleteIcon from '@mui/icons-material/Delete';

export type ChannelType = {
    id: string,
    telegramName: string,
    title: string,
    telegramId: number | null,
    createdAt: string,
    lastMessageId: string,
    imageUrl: string,
    onDelete?: () => void
}

type ItemPropsType = ChannelType

export const Channel: FC<ItemPropsType> = ({id, title, telegramName, imageUrl, onDelete}) => {

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
                key={id}
                onTouchStart={handleTouchStart}
                onMouseDown={handleMouseDown}

                transform={`translateX(${transformX}px)`}
                isDragging={isDragging}
            >
                <Avatar
                    src={imageUrl}
                    sx={{width: 45, height: 45}}
                />
                <Grid2
                    container
                    direction={"column"}
                    spacing={0.5}
                    marginLeft={"13px"}
                >
                    <Typography
                        color={"default"}
                        fontSize={"16px"}
                        fontWeight={500}
                        lineHeight={"16px"}
                        sx={{
                            userSelect: "none",
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        color={"text.secondary"}
                        fontSize={"14px"}
                        fontWeight={400}
                        lineHeight={"14px"}
                        sx={{
                            userSelect: "none",
                        }}
                    >
                        @{telegramName}
                    </Typography>
                </Grid2>
            </BasicItem>
        </Box>
    )
}