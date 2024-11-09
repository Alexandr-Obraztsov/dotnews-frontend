import * as React from 'react';
import {Grid2} from "@mui/material";
import {tg} from "../../../globalTheme";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../../app/appRouter";
import {Main} from "./Main";
import {ChannelList} from "./ChannelList";
import {useEffect} from "react";


export const DigestPage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        tg.BackButton.onClick(() => navigate(PATHS.profile))
        tg.BackButton.show()

        tg.MainButton.hide()
    }, [navigate]);

    return (
        <Grid2
            container
            direction={"column"}
            wrap={"nowrap"}
            paddingBottom={"10px"}
            gap={"10px"}
        >
            <Main/>

            <ChannelList/>
        </Grid2>
    );
};