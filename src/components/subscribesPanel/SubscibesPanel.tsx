import * as React from 'react';
import {Box, Grid2, SxProps, Typography} from "@mui/material";

import 'swiper/css';
import {ItemType} from "../topicsList/item/Item";
import {TopicsList} from "../topicsList/TopicsList";

type SubscibesPanelPropsType = {
    title: string
    items: ItemType[]
    editHandler?: () => void
    sx?: SxProps
};


export const SubscibesPanel: React.FC<SubscibesPanelPropsType> = ({title, items, sx, editHandler}) => {

    return (
        <Box
            sx={sx}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1}
        >
            <Grid2
                container
                wrap={"nowrap"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
            >
                <Typography
                    variant={"h4"}
                    fontSize={"20px"}
                >
                    {title}
                </Typography>

                <Typography
                    variant={"body1"}
                    fontSize={"15px"}
                    sx={{
                        color: window.Telegram.WebApp.themeParams.link_color,
                        cursor: "pointer",
                    }}

                    onClick={editHandler}
                >
                    Редактировать
                </Typography>
            </Grid2>
            {items && items.length
                ? <TopicsList items={items} sx={{
                    marginTop: "15px",
                }}/>
                : <Grid2
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                >
                    <Typography
                        variant={"body1"}
                        fontSize={"17px"}
                        fontWeight={400}
                        color={"text.secondary"}
                        sx={{
                            opacity: 0.3
                        }}
                    >
                        Здесь ничего нет...
                    </Typography>
                </Grid2>
            }


        </Box>
    );
};