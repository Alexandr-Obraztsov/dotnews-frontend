// @flow 
import * as React from 'react';
import {ScrollableItem} from "../scrollableItem/ScrollableItem";
import {Avatar, Grid2, Typography} from "@mui/material";

export type ChannelType = {
    id: string,
    telegramName: string,
    title: string,
    telegramId: number | null,
    createdAt: string,
    lastMessageId: string,
    imageUrl: string,
}

type ChannelPropsType = ChannelType & {
    onDelete?: () => void
}

export const Channel : React.FC<ChannelPropsType> = ({imageUrl, title, telegramName, onDelete}) => {
    return (
        <ScrollableItem onDelete={onDelete}>
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
        </ScrollableItem>
    );
};