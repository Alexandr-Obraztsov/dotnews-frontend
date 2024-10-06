import * as React from 'react';
import {Grid2} from "@mui/material";
import Lottie from "lottie-react";
import Comp1 from "../../assets/emoji/Comp 1.json";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {StyledButton} from "../../components/styled/StyledButton";

export const ErrorPage : React.FC = () => {
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
                <Lottie animationData={Comp1}
                        loop={true}
                        style={{width: 100, height: 100, backgroundColor: 'transparent'}}
                />

                <Header
                    marginBlockStart={"10px"}
                    textAlign={"center"}
                >
                    Something went wrong!
                </Header>

                <Body1 marginBlockStart={"10px"} paddingX={"70px"} color={"text.secondary"}>
                    Please, try again...
                </Body1>

            </Grid2>

        </Grid2>
    );
};