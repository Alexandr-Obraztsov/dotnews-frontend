import * as React from 'react';
import {BasicItem} from "../../styled/BasicItem";
import {Grid2, IconButton, Skeleton, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ChannelType} from "../channel/Channel";

export type DigestType = {
    id: string
    name: string
    createdAt: string
    channelsUpdatedAt: string
    timeInterval: string
    nextAt: string
    receptionTime: string
    userId: string
};

type DigestPropsType = {
    image?: string
    name: string
    receptionTime: string
    onClick?: () => void
    channels?: ChannelType[]
};

export const Digest: React.FC<DigestPropsType> = ({name, receptionTime, onClick, image, channels}) => {
    return (
        <BasicItem onClick={onClick}>
            <Grid2
                container
                direction={"row"}
                wrap={"nowrap"}
                alignItems={"center"}
            >
                {image
                    ? <img
                        src={image}
                        alt={name}
                        width={38}
                        height={38}
                    />
                    : <Skeleton
                        variant="circular"
                        width={38}
                        height={38}
                    />
                }

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
                    >
                        {name}
                    </Typography>

                    <Grid2
                        container
                        direction={"row"}
                        alignItems={"center"}
                        gap={"2px"}
                        color={tg.themeParams.subtitle_text_color}
                        fontSize={"13px"}

                    >
                        <AccessTimeIcon
                            fontSize={"inherit"}
                            color={"inherit"}
                        />
                        <Typography
                            fontSize={"inherit"}
                            fontWeight={400}
                            lineHeight={"normal"}
                        >
                            {receptionTime ? receptionTime : "Ежедневно / 09:00"}
                        </Typography>
                    </Grid2>
                </Grid2>

                <Grid2
                    container
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    marginLeft={"15px"}
                >
                    {channels
                        ? channels.map((channel, index) => (
                            <img
                                key={index}
                                src={channel.imageUrl}
                                alt='channel'
                                style={{ 
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    marginLeft: "-8px"
                                }}
                            />
                        ))
                        : Array(3).fill(0).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="circular"
                                width={20}
                                height={20}
                                sx={{
                                    marginLeft: "-8px"
                                }}
                            />
                        ))}
                </Grid2>
                <IconButton sx={{
                    fontSize: "12px",
                    color: tg.themeParams.subtitle_text_color,
                    position: "absolute",
                    right: 0,
                }}>
                    <ArrowForwardIosIcon fontSize={"inherit"}/>
                </IconButton>
            </Grid2>
        </BasicItem>
    );
};