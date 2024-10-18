import React, {FC} from "react";
import {Grid2, Skeleton, Typography} from "@mui/material";
import {BasicItem} from "../../styled/BasicItem";

export type ItemType = {
    id: string,
    name: string,
    tag?: string,
    checked?: boolean
    onClick?: (id: string) => void
}


export const Item: FC<ItemType> = ({id, name, tag, checked, onClick}) => {

    const handleClick = () => {
        onClick?.(id)
    }

    const textColor = onClick && !checked ? "default" : "";

    return (
        <BasicItem
            key={id}
            onClick={onClick ? handleClick : undefined}
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
        </BasicItem>
    )
}