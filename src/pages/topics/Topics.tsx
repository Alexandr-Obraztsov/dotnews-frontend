import * as React from 'react';
import {Divider, Grid2} from "@mui/material";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {CheckboxList} from "../../components/checkboxList/CheckboxList";
import styled from "@emotion/styled";
import {theme} from "../../index";
import {StyledButton} from "../../components/styled/StyledButton";
import {v1} from "uuid";


const items = [
    {
        id: v1(),
        imgSrc: "",
        title: "Title1",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title2",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title3",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title4",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title5",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title6",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title6",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title7",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title",
        description: "Description"
    },
    {
        id: v1(),
        imgSrc: "",
        title: "Title",
        description: "Description"
    },
]


export const Topics: React.FC = () => {
    return (
        <>
            <Grid2 container
                   direction={"column"}
                   alignItems={"center"}
                   height={"100vh"}
                   wrap={"nowrap"}
            >
                <Header marginBlockStart={"40px"}
                >
                    Topics
                </Header>
                <Body1
                    marginBlock={"10px"}
                    paddingX={"70px"}
                >
                    Choose the topics you are interested in
                </Body1>
                <Divider flexItem/>
                <CheckboxList items={items} paddingBottom={"130px"}/>
            </Grid2>

            <Grid2
                container
                direction={"column"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                paddingBlockEnd={"50px"}
                position={"fixed"}
                bottom={"0"}
                width={"100%"}
                height={"150px"}
                sx={{background: "linear-gradient(to top, black 30%, transparent 100%)", pointerEvents: "none", zIndex: 10}}

            >
                <StyledButton
                    variant={"contained"}
                    color={"primary"}
                    size={"large"}
                    href={"/channels"}
                    sx={{pointerEvents: "all"}}
                >
                    Next
                </StyledButton>
            </Grid2>
        </>
    );
};