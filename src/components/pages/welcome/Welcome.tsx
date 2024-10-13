import * as React from 'react';
import {Grid2} from "@mui/material";
import hello_emoji from "../../../assets/emoji/Waving Hand.json";
import Lottie from "lottie-react";
import {Header} from "../../styled/Header";
import {Body1} from "../../styled/Body1";
import {StyledButton} from "../../styled/StyledButton";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";

export const Welcome = () => {

    const navigate = useNavigate()

    const userId = tg.initDataUnsafe.user!.id;
    tg.BackButton.hide()

    const onSubmit = () => {
        registerUser(userId)
        navigate("/topics")
    }


    return (
        <>
            <Grid2
                container
                height={"100vh"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Lottie
                    animationData={hello_emoji}
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

            <StyledButton onClick={onSubmit}>
                Давай начнем!
            </StyledButton>
        </>
    );
};
