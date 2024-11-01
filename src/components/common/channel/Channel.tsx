import React, {FC} from "react";
import {Avatar, Grid2, Typography} from "@mui/material";
import {BasicItem} from "../../styled/BasicItem";

export type ChannelType = {
    id: string,
    telegramName: string,
    telegramId: number | null,
    createdAt: string,
    lastMessageId: string,
    imageUrl: string,
}

type ItemPropsType = ChannelType & {
    onClick?: (id: string) => void
}


export const Channel: FC<ItemPropsType> = ({id, telegramName, imageUrl, onClick}) => {

    const handleClick = () => {
        onClick?.(id)
    }

    return (
        <BasicItem
            key={id}
            onClick={onClick ? handleClick : undefined}
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
                >{telegramName}</Typography>
            </Grid2>
        </BasicItem>
    )
}