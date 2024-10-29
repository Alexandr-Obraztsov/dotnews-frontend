import * as React from 'react';
import {Grid2} from "@mui/material";
import hello_emoji from "../../../assets/emoji/Waving Hand.json";
import Lottie from "lottie-react";
import {Header} from "../../styled/Header";
import {Body1} from "../../styled/Body1";
import {StyledButton} from "../../styled/StyledButton";
import {useNavigate} from "react-router-dom";
import {tg} from "../../../globalTheme";
import {setUserAPI} from "../../../api/api";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ErrorPage} from "../errorPage/ErrorPage";
import {useState} from "react";
import {setUserAC} from "../../../store/userReducer";
import {ROUTES} from "../../../appRouter";

export const Welcome = () => {

    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate()

    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    tg.BackButton.hide()

    const onSubmit = async () => {
        try {
            const res = await setUserAPI(user.telegramId, user.digestReceptionTime)
            dispatch(setUserAC(res));
            navigate(ROUTES.profile)
        }
        catch (e: Error | any) {
            setError(e)
        }
    }

    if (error) return <ErrorPage error={error}/>
    else return (
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
