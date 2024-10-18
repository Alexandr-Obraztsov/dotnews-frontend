import * as React from 'react';
import {Item, ItemType} from "../../../ItemsList/item/Item";
import {Divider, Stack, SxProps} from "@mui/material";
import {AnotherTopicsButton} from "./AnotherTopicsButton";
import {useState} from "react";

type TopicsListPropsType = {
    topics: ItemType[],
    sx?: SxProps
};

export const TopicsList : React.FC<TopicsListPropsType> = ({topics, sx}) => {

    const [isShowMore, setIsShowMore] = useState(false);

    let renderedItems = topics.map(item => <Item key={item.id} id={item.id} name={item.name} checked={item.checked}/>)

    const handleClick = () => {
        setIsShowMore(!isShowMore)
    }

    if(renderedItems.length > 3 && !isShowMore) {
        renderedItems = renderedItems.slice(0, 2)
        renderedItems.push(<AnotherTopicsButton onClick={handleClick}/>)
    }

    return (
        <Stack
            divider={<Divider/>}
            sx = {{
                ...sx
            }}
        >
            {renderedItems}

        </Stack>
    );
};