import * as React from 'react';
import {Grid2} from "@mui/material";
import hello_emoji from "../../assets/emoji/Waving Hand.json";
import Lottie from "lottie-react";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";
import {useNavigate} from "react-router-dom";
import {configs} from "../../configs";
import {useEffect, useState} from "react";
import {ErrorPage} from "../error/ErrorPage";
import {sendMetrics} from "../../SendMetrics";


export const Welcome = () => {

    const navigate = useNavigate()
    const [error, setError] = useState<string>("");

    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe.user!.id;
    tg.BackButton.hide()

    const onSubmit= () => {
        sendMetrics("NewUserEnteredBot")
        fetch(`${configs.url}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegramId: userId,
                id: "123",
                createdAt: "123",

            })
        })
        navigate("/topics")
    }

    if (error)
        return <ErrorPage/>
    else
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
                <Lottie animationData={hello_emoji}
                       loop={true}
                       style={{width: 100, height: 100, backgroundColor: 'transparent'}}
                />

                <Header marginBlockStart={"10px"}>
                    Привет!
                </Header>

                <Body1 marginBlockStart={"10px"} paddingX={"70px"} color={"text.secondary"}>
                    Это твой персональный новостной агрегатор. Приступим к настройке!
                </Body1>

            </Grid2>

            <StyledButton variant={"contained"}
                          size={"large"}
                          onClick={onSubmit}
            >
                Давай начнем!
            </StyledButton>
        </Grid2>
    );
};
