import * as React from 'react';
import {Box, Divider, Grid2, SxProps, Typography} from "@mui/material";

import 'swiper/css';
import {ItemType} from "../ItemsList/item/Item";
import {ItemsList} from "../ItemsList/ItemsList";
import {globalTheme, tg} from "../../globalTheme";

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
            bgcolor={"background.paper"}
            padding={"10px 20px"}
        >
            <Grid2
                container
                wrap={"nowrap"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
                marginBottom={"10px"}
            >
                <Typography
                    variant={"h4"}
                    fontSize={"16px"}
                    fontWeight={300}
                >
                    {title}
                </Typography>

                <Typography
                    variant={"body1"}
                    fontSize={"14px"}
                    fontWeight={300}
                    sx={{
                        color: tg.themeParams.link_color,
                        cursor: "pointer",
                    }}

                    onClick={editHandler}
                >
                    Редактировать
                </Typography>
            </Grid2>
            <Box
                bgcolor={"background.paper"}
                height={"100%"}
            >

                {items && items.length
                    ? <ItemsList items={items}/>
                    : <Grid2
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography
                            variant={"body1"}
                            fontSize={"14px"}
                            fontWeight={300}
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


        </Box>
    );
};