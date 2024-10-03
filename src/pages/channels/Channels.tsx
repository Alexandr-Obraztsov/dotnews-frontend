import * as React from 'react';
import {Divider, Grid2, InputAdornment, TextField} from "@mui/material";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {CheckboxList} from "../../components/checkboxList/CheckboxList";
import {StyledButton} from "../../components/styled/StyledButton";
import {AccountCircle} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";
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


export const Channels: React.FC = () => {
    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
    );

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
                    Channels
                </Header>
                <Body1
                    marginBlock={"10px"}
                    paddingX={"70px"}
                >
                    You can choose additional channels you want to read
                </Body1>

                <TextField
                    value={value}
                    onChange={handleChange}
                    variant={"outlined"}
                    placeholder={"Search"}
                    fullWidth={true}
                    size={"small"}

                    sx={{
                        margin: "20px 0 20px",
                        paddingX: "20px",
                        "&>div": {
                            backgroundColor: "#474747"
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            )
                        }
                    }}/>

                <Divider flexItem/>
                <CheckboxList items={filteredItems} paddingBottom={"130px"}/>
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
                sx={{
                    background: "linear-gradient(to top, black 30%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 10
                }}

            >
                <StyledButton
                    variant={"contained"}
                    color={"primary"}
                    size={"large"}
                    sx={{pointerEvents: "all"}}
                    href={"/finishSetup"}
                >
                    Next
                </StyledButton>
            </Grid2>
        </>
    );
};