import React, {CSSProperties, FC} from "react";
import {Box, Grid2, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Body1} from "../../styled/Body1";
import {Done} from "@mui/icons-material";
import Lottie from "lottie-react";
import Boy_emoji from "../../../assets/emoji/Boy.json";
import Loopmoney from "../../../assets/emoji/Loopmoney.json";
import Notebook from "../../../assets/emoji/Notebook.json";

export type ItemType = {
    id: string,
    name: string,
    checked?: boolean
    clickCallback?: (id: string) => void

}

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
                    backgroundColor: window.Telegram.WebApp.themeParams.accent_text_color,
                    opacity: checked ? 0.25 : 0,
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

const StyledDone = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: flex;
    color: window.Telegram.WebApp.themeParams.accent_text_color;
    justify-content: center;
    align-items: center;
`