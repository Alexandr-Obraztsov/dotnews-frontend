import * as React from 'react';
import {Divider, Stack} from "@mui/material";
import {Item, ItemPropsType} from "./item/Item";


type CheckboxListPropsType = {
    items: ItemPropsType[]
    paddingBottom?: string
}


export const CheckboxList : React.FC<CheckboxListPropsType> = ({items, paddingBottom="0"}) => {
    return (
        <Stack
            divider={<Divider></Divider>}
            overflow={"scroll"}
            height={"100%"}
            width={"100%"}
            paddingBlockEnd={paddingBottom}
        >
            {items.map(item => <Item key={item.id} {...item} />)}
        </Stack>
    );
};