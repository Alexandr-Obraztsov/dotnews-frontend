import * as React from 'react';
import {Box, Grid2, IconButton, Skeleton, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ChannelType} from "../channel/Channel";
import {ScrollableItem} from "../scrollableItem/ScrollableItem";
import {daysOptions} from "../../pages/digestTimeEditPage/DigestTimeEditPage";
import dayjs from "dayjs";

export type DigestType = {
    id: string
    name: string
    emoji: string
    createdAt: string
    channelsUpdatedAt: string
    timeInterval: string
    nextAt: string
    receptionTime: string
    userId: string
};

type DigestPropsType = {
    digest: DigestType
    onClick?: () => void
    onDelete?: () => void
    channels: ChannelType[]
};

export const Digest: React.FC<DigestPropsType> = ({digest, onClick, channels, onDelete}) => {

    const renderedChannels = channels.map((channel, index) => (
        <img
            key={index}
            src={channel.imageUrl}
            alt='channel'
            style={{
                width: 25,
                height: 25,
                borderRadius: 10,
                marginLeft: index ? "-8px" : "0"
            }}
        />
    ))

    return (
        <ScrollableItem onClick={onClick} onDelete={onDelete}>
            <Grid2
                container
                direction={"row"}
                wrap={"nowrap"}
                alignItems={"center"}
                justifyContent={"space-between"}
                position={"relative"}
                width={"100%"}
            >
                <Grid2
                    container
                    direction={"row"}
                    alignItems={"center"}
                    wrap={"nowrap"}
                >
                    <Box>
                        {digest.emoji
                            ? <img
                                src={digest.emoji}
                                alt={digest.name}
                                width={38}
                                height={38}
                            />
                            : <Skeleton
                                variant="circular"
                                width={38}
                                height={38}
                            />
                        }
                    </Box>

                    <Grid2
                        container
                        direction={"column"}
                        marginLeft={"10px"}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                        gap={"2px"}
                    >
                            <Typography
                                fontSize={"18px"}
                                fontWeight={400}
                                lineHeight={"normal"}
                                color={tg.themeParams.text_color}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                                maxWidth={"100%"}
                            >
                                {digest.name}
                            </Typography>


                        <Grid2
                            container
                            direction={"row"}
                            alignItems={"center"}
                            gap={"2px"}
                            color={tg.themeParams.subtitle_text_color}
                            fontSize={"13px"}
                            wrap={"nowrap"}
                            width={"100%"}
                        >
                            <AccessTimeIcon
                                fontSize={"inherit"}
                                color={"inherit"}
                            />
                            <Typography
                                fontSize={"inherit"}
                                fontWeight={400}
                                lineHeight={"normal"}
                                maxWidth={"100%"}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                            >
                                {daysOptions[+dayjs(digest.timeInterval, "D.HH:mm:ss").format("D") as keyof typeof daysOptions]} в {dayjs(digest.receptionTime, "HH:mm:ss").format("HH:mm")}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>

                <Grid2
                    container
                    alignItems={"center"}
                    wrap={"nowrap"}
                    gap={"10px"}
                    flexShrink={0}
                >
                    <Grid2
                        container
                        wrap={"nowrap"}
                    >
                        {renderedChannels}
                    </Grid2>
                    
                    <IconButton sx={{
                        fontSize: "12px",
                        color: tg.themeParams.subtitle_text_color,
                        right: 0,
                    }}>
                        <ArrowForwardIosIcon fontSize={"inherit"}/>
                    </IconButton>
                </Grid2>
            </Grid2>
        </ScrollableItem>
    );
};