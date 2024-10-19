import * as React from 'react';
import {Item, ItemType} from "../../ItemsList/item/Item";
import {Divider, Stack, SxProps} from "@mui/material";
import {AnotherTopicsButton} from "./AnotherTopicsButton";
import {useState} from "react";
import {AddNewTopicButton} from "./AddNewTopicButton";

type TopicsListPropsType = {
    addTopicHandler: () => void
    channels: ItemType[],
    sx?: SxProps
};

export const ChannelsList : React.FC<TopicsListPropsType> = ({channels, sx, addTopicHandler}) => {

    const [isShowMore, setIsShowMore] = useState(false);

    let renderedItems = channels.map(item => <Item key={item.id} id={item.id} name={item.name}/>)

    const handleClick = () => {
        setIsShowMore(!isShowMore)
    }

    if(renderedItems.length > 3 && !isShowMore) {
        renderedItems = renderedItems.slice(0, 2)
        renderedItems.push(<AnotherTopicsButton onClick={handleClick}/>)
    }

    renderedItems.push(<AddNewTopicButton onClick={addTopicHandler} topicsCount={channels.length} topicsMaxCount={35}/>)

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