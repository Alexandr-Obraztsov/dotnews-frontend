import * as React from 'react';
import {Box, Grid2, SxProps, Typography} from "@mui/material";

import 'swiper/css';
import {ItemType} from "../checkboxList/item/Item";
import Lottie from "lottie-react";

import Boy_emoji from "../../assets/emoji/Boy.json";
import Loopmoney from "../../assets/emoji/Loopmoney.json";
import Notebook from "../../assets/emoji/Notebook.json";
import {CSSProperties} from "react";

type SubscibesPanelPropsType = {
    title: string
    items: ItemType[]
    editHandler?: () => void
    sx?: SxProps
};


const getTopicEmoji = (name: string): React.ReactNode => {
    const emojiStyle: CSSProperties = {
        height: 60,
        backgroundColor: 'transparent'
    }

    switch (name) {
        case "Information Technologies":
            return <Lottie
                animationData={Boy_emoji}
                loop={true}
                style={emojiStyle}
            />
        case "Crypto":
            return <Lottie
                animationData={Loopmoney}
                loop={true}
                style={emojiStyle}
            />
        case "Startups":
            return <Lottie
                animationData={Notebook}
                loop={true}
                style={emojiStyle}
            />
    }
}

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
                    Edit
                </Typography>
            </Grid2>
            {items && items.length
                ? <Grid2
                    container
                    marginTop={"15px"}
                    justifyContent={"flex-start"}
                    spacing={1}
                    columns={3}
                >
                    {items.map(item =>
                        <Grid2
                            key={item.id}
                            size={1}
                            height={"110px"}
                            bgcolor={"background.paper"}
                            padding={"10px"}
                            borderRadius={"10px"}
                        >
                            {getTopicEmoji(item.name)}
                            <Typography
                                variant={"body1"}
                                textAlign={"center"}
                                fontSize={"12px"}
                                fontWeight={600}
                                marginBlockStart={"10px"}
                                color={"text.secondary"}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                whiteSpace={"nowrap"}
                            >
                                {item.name}
                            </Typography>
                        </Grid2>
                    )}
                </Grid2>
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