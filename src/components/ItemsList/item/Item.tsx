import React, {FC} from "react";
import {Box, Grid2, Skeleton, Typography} from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "lottie-react";
import Boy_emoji from "../../../assets/emoji/Boy.json";
import Loopmoney from "../../../assets/emoji/Loopmoney.json";
import Notebook from "../../../assets/emoji/Notebook.json";

export type ItemType = {
    id: string,
    name: string,
    tag?: string,
    checked?: boolean
    onClick?: (id: string) => void
}

export const getItemEmoji = (name: string, size: number = 60): React.ReactNode => {
    let animationData = {};
    switch (name) {
        case "IT":
            animationData = Boy_emoji
            break
        case "Криптовалюта":
            animationData = Loopmoney
            break
        case "Стартапы":
            animationData = Notebook
            break
        default:
            animationData = Boy_emoji
            break
    }
    return <Grid2
    container
    justifyContent={"center"}
    alignItems={"center"}
    height={size}
    width={size}
    borderRadius={"50%"}
    sx={{backgroundColor: "white"}}
    padding={"5px"}
    >
        <Lottie
            animationData={animationData}
            loop={true}
            style={{
                backgroundColor: 'transparent',
                height:"100%",
                width: "100%",
            }}
        />
    </Grid2>
}


export const Item: FC<ItemType> = ({id, name, tag, checked, onClick}) => {

    const handleClick = () => {
        onClick?.(id)
    }

    const textColor = onClick && !checked ? "default" : "";

    return (
        <Grid2
            container
            key={id}
            onClick={onClick ? handleClick : undefined}
            alignItems={"center"}
            sx={{
                cursor: "pointer",
                paddingY: "10px",
            }}
        >
            <Skeleton variant={"circular"} width={40} height={40}/>
            <Grid2
                container
                direction={"column"}
                spacing={0.5}
            >
                <Typography
                    marginLeft={"10px"}
                    color={textColor}
                    fontSize={"16px"}
                    fontWeight={500}
                    lineHeight={"16px"}
                >{name}</Typography>

                <Typography
                    marginLeft={"10px"}
                    color={"text.secondary"}
                    fontSize={"13px"}
                    fontWeight={500}
                    lineHeight={"12px"}
                >{tag || "@nothing"}</Typography>
            </Grid2>
        </Grid2>
    )
}