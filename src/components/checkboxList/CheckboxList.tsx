import * as React from 'react';
import {Divider, Stack} from "@mui/material";
import {Item, ItemType} from "./item/Item";


type CheckboxListPropsType = {
    items: ItemType[]
    paddingBottom?: string
    clickCallback: (id: string) => void
}


export const CheckboxList : React.FC<CheckboxListPropsType> = ({items, paddingBottom="0", clickCallback}) => {
    return (
        <Stack
            divider={<Divider></Divider>}
            overflow={"auto"}
            height={"100%"}
            width={"100%"}
            paddingBlockEnd={paddingBottom}
        >
            {items.map(item => {
                return <Item key={item.id} {...item} clickCallback={clickCallback}/>
            })}
        </Stack>
    );
};