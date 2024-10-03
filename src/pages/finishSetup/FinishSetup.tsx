import * as React from 'react';
import styled from "@emotion/styled";
import {Grid2} from "@mui/material";
import emoji from "../../assets/emoji/Floating Hearts.json";
import Lottie from "lottie-react";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";


export const FinishSetup = () => {
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

                <Header marginBlockEnd={"20px"}>
                    Well done!
                </Header>

                <Emoji animationData={emoji}
                       loop={true}
                       style={{width: 60, height: 60, backgroundColor: 'transparent'}}
                />

                <Body1 marginBlockStart={"30px"} paddingX={"70px"}>
                    You have started to receive news
                </Body1>

            </Grid2>

            <StyledButton variant={"contained"}
                          color={"primary"}
                          size={"large"}
                          href={"/profile"}
            >
                Back to Telegram
            </StyledButton>
        </Grid2>
    );
};


const Emoji = styled(Lottie)`
    position: relative;

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 90px;
        border-radius: 35%;
        background-color: #474747;
    }
`