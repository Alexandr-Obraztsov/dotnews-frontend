import * as React from 'react';
import {Grid2} from "@mui/material";
import Lottie from "lottie-react";
import Comp1 from "../../assets/emoji/Comp 1.json";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {useNavigate} from "react-router-dom";

export const ErrorPage : React.FC = () => {

    const tg = window.Telegram.WebApp;

    const navigate = useNavigate();



    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        navigate(-1);
    })

    return (
        <Grid2 container
               direction={"column"}
               justifyContent={"space-between"}
               alignItems={"center"}
               height={"100vh"}
               marginX={"20px"}
        >
            <Grid2 container
                   direction={"column"}
                   justifyContent={"center"}
                   alignItems={"center"}
                   flexGrow={1}
            >
                <Lottie animationData={Comp1}
                        loop={true}
                        style={{width: 100, height: 100, backgroundColor: 'transparent'}}
                />

                <Header
                    marginBlockStart={"10px"}
                    marginInline={"20px"}
                    textAlign={"center"}
                >
                    Что-то пошло не так!
                </Header>

                <Body1 marginBlockStart={"10px"} paddingX={"40px"} color={"text.secondary"}>
                    Пожалуйста, попробуйте еще раз...
                </Body1>

            </Grid2>

        </Grid2>
    );
};