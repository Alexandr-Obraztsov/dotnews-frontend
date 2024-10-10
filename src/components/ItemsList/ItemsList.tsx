import * as React from 'react';
import {Item, ItemType} from "./item/Item";
import {Grid2, SxProps} from "@mui/material";

type TopicsListPropsType = {
    items: ItemType[]
    onClick?: (id: string) => void
    sx?: SxProps
}

export const ItemsList : React.FC<TopicsListPropsType> = ({items, onClick, sx}) => {

    return (
        <Grid2
            container
            sx={sx}
            justifyContent={"center"}
            spacing={0.6}
        >
            {items.map(item =>
                <Item id={item.id} name={item.name} key={item.id} checked={item.checked} onClick={onClick}/>
            )}
        </Grid2>
    );
};