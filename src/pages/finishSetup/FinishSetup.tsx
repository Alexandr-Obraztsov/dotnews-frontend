import * as React from 'react';
import {Grid2} from "@mui/material";
import emoji from "../../assets/emoji/Floating Hearts.json";
import Lottie from "lottie-react";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";
import {useNavigate} from "react-router-dom";


export const FinishSetup = () => {
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate()

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate("/topics")
    })

    tg.MainButton.hide()

    return (
        <Grid2 container
               direction={"column"}
               justifyContent={"space-between"}
               alignItems={"center"}
               height={"100vh"}
               paddingY={"50px"}
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
                    Well done!
                </Header>

                <Body1
                    marginBlockStart={"5px"}
                    paddingX={"70px"}
                    color={"text.secondary"}
                >
                    You have started to receive news
                </Body1>

            </Grid2>

            <StyledButton variant={"contained"}
                          size={"large"}
                          href={"/profile"}
            >
                Back to Telegram
            </StyledButton>
        </Grid2>
    );
};
