import * as React from 'react';
import styled from "@emotion/styled";
import {Grid2} from "@mui/material";
import hello_emoji from "../../assets/emoji/hello.tgs";


export const Welcome = () => {
    return (
        <Grid2 container
               direction={"column"}
               justifyContent={"center"}
               alignItems={"center"}
               height={"100vh"}>
            Welcome
        </Grid2>
    );
};


const Emoji = styled.img`

`