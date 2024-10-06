import React, {FC} from "react";
import {Box, Grid2} from "@mui/material";
import styled from "@emotion/styled";
import {Body1} from "../../styled/Body1";
import {Done} from "@mui/icons-material";

export type ItemType = {
    id: string,
    name: string,
    checked?: boolean
}

export type ItemPropsType = {
    clickCallback: (id: string) => void
} & ItemType;


export const Item: FC<ItemPropsType> = ({id, name, checked, clickCallback}) => {
    const handleClick = () => {
        clickCallback(id)
    }

    const imgSrc = ""

    return (
        <StyledItem>
            <Grid2
                container
                gap={"15px"}
            >
                {imgSrc
                    ? <Image src={imgSrc} alt={"ss"}/>
                    : <Box
                        borderRadius={"30%"}
                        width={"60px"}
                        height={"60px"}
                        bgcolor={"background.paper"}
                    ></Box>}

                <Grid2
                    container
                    direction={"column"}
                    alignItems={"flex-start"}
                >
                    <Body1 fontWeight={"bold"}>{name}</Body1>
                    <Body1 color={"text.secondary"}>Описание</Body1>
                </Grid2>
            </Grid2>
            <Box
                position={"absolute"}
                right={"0"}
                top={"0"}
                width={"100%"}
                height={"100%"}
                sx={{
                    transition: "0.3s",
                    opacity: checked ? 1 : 0,

                    "&::after": {
                        content: "''",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: window.Telegram.WebApp.themeParams.accent_text_color,
                        opacity: 0.2,
                    }
                }}
            >
                <StyledDone>
                    <Done/>
                </StyledDone>
            </Box>
            <HiddenButton onClick={handleClick}/>
        </StyledItem>
    )
}

const Image = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 30%;
    object-fit: cover;
`

const StyledItem = styled.div`
    padding: 15px;
    position: relative;
`

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
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    background-color: ${window.Telegram.WebApp.themeParams.section_header_text_color};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`