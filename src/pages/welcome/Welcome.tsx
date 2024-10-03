import * as React from 'react';
import styled from "@emotion/styled";
import {Grid2} from "@mui/material";
import hello_emoji from "../../assets/emoji/hello.tgs";
import Lottie from "lottie-react";


export const Welcome = () => {
    return (
        <Grid2 container
               direction={"column"}
               justifyContent={"center"}
               alignItems={"center"}
               height={"100vh"}
        >
            <Emoji animationData={hello_emoji}
                    loop={true}
                    style={{width: 300, height: 300}}
                    />
        </Grid2>
    );
};


const Emoji = styled(Lottie)`

`