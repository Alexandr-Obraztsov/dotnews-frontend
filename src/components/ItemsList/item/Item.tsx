import React, {FC} from "react";
import {Chip, Typography} from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "lottie-react";
import Boy_emoji from "../../../assets/emoji/Boy.json";
import Loopmoney from "../../../assets/emoji/Loopmoney.json";
import Notebook from "../../../assets/emoji/Notebook.json";
import {globalTheme} from "../../../globalTheme";

export type ItemType = {
    id: string,
    name: string,
    checked?: boolean
    onClick?: (id: string) => void
}

export const getItemEmoji = (name: string, height: number = 60): React.ReactNode => {
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
    return <Lottie
        animationData={animationData}
        loop={true}
        style={{
            height: height,
            backgroundColor: 'transparent'
        }}
    />
}


export const Item: FC<ItemType> = ({id, name, checked, onClick}) => {

    const handleClick = () => {
        onClick?.(id)
    }

    const NameTypography = styled(Typography)({
        color: checked ? globalTheme.palette.text.primary : globalTheme.palette.primary.main,
        fontSize: "14px",
        fontWeight: 400,
    })

    return (
        <Chip
            color={"primary"}
            icon={<div>{getItemEmoji(name, 20)}</div>}
            variant={checked ? "filled" : "outlined"}
            label={<NameTypography>{name}</NameTypography>}
            key={id}
            onClick={onClick ? handleClick : undefined}
        />
    )
}