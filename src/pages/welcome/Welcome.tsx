import * as React from 'react';
import {Grid2} from "@mui/material";
import hello_emoji from "../../assets/emoji/Waving Hand.json";
import Lottie from "lottie-react";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";
import {useNavigate} from "react-router-dom";
import {configs} from "../../configs";
import {useState} from "react";
import {ErrorPage} from "../error/ErrorPage";


export const Welcome = () => {

    const navigate = useNavigate()
    const [error, setError] = useState<Error | null>(null);

    const tg = window.Telegram.WebApp;
    tg.BackButton.hide()


    const onSubmit= () => {
        fetch(`${configs.url}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegramId: tg.initDataUnsafe.user!.id,
            })
        })
            .then(
                (result) => {
                    if (result.statusText === "OK")
                        navigate("/topics")
                    else
                        setError(new Error(result.statusText))
                },
                (error) => {
                    setError(error)
                    navigate("/profile")
                }
            )
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
               paddingY={"50px"}
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
                    Welcome!
                </Header>

                <Body1 marginBlockStart={"10px"} paddingX={"70px"} color={"text.secondary"}>
                    This is your personal news aggregator. Let's set up the flow of your news.
                </Body1>

            </Grid2>

            <StyledButton variant={"contained"}
                          size={"large"}
                          onClick={onSubmit}
            >
                Let's start!
            </StyledButton>
        </Grid2>
    );
};
