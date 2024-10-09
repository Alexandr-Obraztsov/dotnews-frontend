import React, {CSSProperties, FC} from "react";
import {Box, Grid2, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Body1} from "../../styled/Body1";
import {Done} from "@mui/icons-material";
import Lottie from "lottie-react";
import Boy_emoji from "../../../assets/emoji/Boy.json";
import Loopmoney from "../../../assets/emoji/Loopmoney.json";
import Notebook from "../../../assets/emoji/Notebook.json";
import {tg} from "../../../globalTheme";

export type ItemType = {
    id: string,
    name: string,
    checked?: boolean
    clickCallback?: (id: string) => void
}

export const getTopicEmoji = (name: string, height: number = 60): React.ReactNode => {
    let animationData = {};
    switch (name) {
        case "IT":
            animationData = Boy_emoji
            break
        case "Криптовалюта":
            animationData = Loopmoney
            break
        case "Стартапы":
            animationData = Notebook
            break
        default:
            animationData = Boy_emoji
            break
    }
    return <Lottie
        animationData={animationData}
        loop={true}
        style={{
            height: height,
            backgroundColor: 'transparent'
        }}
    />
}


export const Item: FC<ItemType> = ({id, name, checked, clickCallback}) => {

    const handleClick = () => {
        clickCallback?.(id)
    }

    return (
        <Grid2
            key={id}
            size={1}
            height={"110px"}
            padding={"10px"}
            borderRadius={"10px"}
            position={"relative"}
            bgcolor={"background.paper"}
            sx={{
                "&::before": {
                    content: "''",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    backgroundColor: tg.themeParams.accent_text_color,
                    opacity: checked ? 0.3 : 0,
                    transition: "0.3s",
                    zIndex: 0
                }
            }}
        >
            {getTopicEmoji(name)}
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
                {name}
            </Typography>
            <HiddenButton onClick={handleClick}/>
        </Grid2>
    )
}

const HiddenButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
`