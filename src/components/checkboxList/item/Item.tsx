import React, {FC, MouseEventHandler, useState} from "react";
import {Box, Grid2, Icon} from "@mui/material";
import styled from "@emotion/styled";
import {theme} from "../../../index";
import {Body1} from "../../styled/Body1";
import {Done} from "@mui/icons-material";

export type ItemPropsType = {
    id: string,
    imgSrc: string,
    title: string,
    description: string
}


export const Item: FC<ItemPropsType> = ({imgSrc, title, description}) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleClick = () => {
        setChecked(!checked);
    }

    return (
        <StyledItem>
            <Grid2
                container
                gap={"15px"}
            >
                {imgSrc
                    ? <Image src={imgSrc} alt={"ss"}/>
                    : <Box
                        borderRadius={"30%"}
                        width={"60px"}
                        height={"60px"}
                        bgcolor={"#474747"}
                    ></Box>}

                <Grid2
                    container
                    direction={"column"}
                    alignItems={"flex-start"}
                >
                    <Body1 fontWeight={"bold"}>{title}</Body1>
                    <Body1>{description}</Body1>
                </Grid2>
            </Grid2>
            <Box
                position={"absolute"}
                right={"0"}
                top={"0"}
                bgcolor={"rgba(5,41,22,0.6)"}
                width={"100%"}
                height={"100%"}
                hidden={!checked}
            >
                <StyledDone>
                    <Done/>
                </StyledDone>
            </Box>
            <Checkbox type={"checkbox"} onChange={handleClick}/>
        </StyledItem>
    )
}

const Image = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 30%;
    object-fit: cover;
`

const StyledItem = styled.div`
    padding: 15px;
    position: relative;
`

const Checkbox = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
`

const StyledDone = styled.div`
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    background-color: #0e3f24;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`