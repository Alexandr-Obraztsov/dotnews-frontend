import * as React from 'react';
import {Grid2} from "@mui/material";
import {tg} from "../../../globalTheme";
import {Main} from "./Main";
import {DigestList} from "./DigestList";
import {useEffect} from "react";

export const Profile: React.FC = () => {

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
                paddingBottom={"10px"}
                gap={"10px"}
            >
                <Main/>

                <DigestList/>
            </Grid2>
        </>
    );
};