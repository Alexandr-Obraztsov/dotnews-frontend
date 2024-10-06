import * as React from 'react';
import {Grid2} from "@mui/material";
import emoji from "../../assets/emoji/Floating Hearts.json";
import Lottie from "lottie-react";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";
import {useNavigate} from "react-router-dom";
import {PagePropsType} from "../../App";


export const FinishSetup : React.FC<PagePropsType> = ({setPath}) => {
    const tg = window.Telegram.WebApp;

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        setPath("topics")
    })

    tg.MainButton.hide()

    return (
        <Grid2 container
               direction={"column"}
               justifyContent={"space-between"}
               alignItems={"center"}
               height={"100vh"}
               paddingY={"10px"}
        >
            <Grid2 container
                   direction={"column"}
                   justifyContent={"center"}
                   alignItems={"center"}
                   flexGrow={1}
            >
                <Lottie animationData={emoji}
                        loop={true}
                        style={{width: 110, height: 110, backgroundColor: 'transparent'}}
                />

                <Header marginBlockEnd={"0"}>
                    Поздравляем!
                </Header>

                <Body1
                    marginBlockStart={"5px"}
                    paddingX={"70px"}
                    color={"text.secondary"}
                >
                    Теперь вы получаете новости.
                </Body1>

            </Grid2>

            <StyledButton variant={"contained"}
                          size={"large"}
                          href={"/profile"}
            >
                Перейти в Профиль
            </StyledButton>
        </Grid2>
    );
};
