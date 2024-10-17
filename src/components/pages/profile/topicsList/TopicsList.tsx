import * as React from 'react';
import {Item, ItemType} from "../../../ItemsList/item/Item";
import {Divider, Stack, SxProps} from "@mui/material";

type TopicsListPropsType = {
    topics: ItemType[],
    sx?: SxProps
};

export const TopicsList : React.FC<TopicsListPropsType> = ({topics, sx}) => {
    return (
        <Stack
            divider={<Divider/>}
            bgcolor={"background.paper"}
            paddingX={"20px"}
            sx = {{
                ...sx
            }}
        >
            {topics.map(item => <Item key={item.id} id={item.id} name={item.name} checked={item.checked}/>)}

        </Stack>
    );
};