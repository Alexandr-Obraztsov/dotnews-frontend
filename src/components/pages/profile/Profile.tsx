import * as React from 'react';
import {Grid2} from "@mui/material";
import {tg} from "../../../globalTheme";
import {Header} from "./Header";
import {useAppSelector} from "../../../store/hooks";
import {ChannelsList} from "./ChannelsList";
import {SettingsButton} from "./SettingsButton";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../appRouter";
import {useCallback, useEffect} from "react";

export const Profile: React.FC = () => {
    const navigate = useNavigate()

    const {channels} = useAppSelector(res => res.user);

    const addTopicHandler = useCallback(() => {
        if (channels.length < 35) {
            navigate(ROUTES.addChannel)
        }
    }, [navigate, channels]);

    const onSettingClickHandler = useCallback(() => {
        navigate(ROUTES.settings)
    }, [navigate]);

    useEffect(() => {
        tg.BackButton.hide()
        tg.MainButton.hide()
    }, []);

    return (
        <>
            <Grid2
                container
                direction={"column"}
                wrap={"nowrap"}
                paddingBottom={"12px"}
                gap={"12px"}
            >
                <Header/>

                <SettingsButton onClick={onSettingClickHandler}/>

                <ChannelsList channels={channels} addTopicHandler={addTopicHandler}/>
            </Grid2>
        </>
    );
};