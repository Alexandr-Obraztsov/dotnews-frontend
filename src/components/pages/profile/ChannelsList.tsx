import * as React from 'react';
import {Channel, ChannelType} from "../../channel/Channel";
import {Divider, Stack, SxProps} from "@mui/material";
import {AnotherTopicsButton} from "./AnotherTopicsButton";
import {useState} from "react";
import {AddNewTopicButton} from "./AddNewTopicButton";

type ChannelsListPropsType = {
    addTopicHandler: () => void
    channels: ChannelType[],
    sx?: SxProps
};

export const ChannelsList : React.FC<ChannelsListPropsType> = ({channels, sx, addTopicHandler}) => {

    const [isShowMore, setIsShowMore] = useState(false);

    let renderedItems = channels.map(item => <Channel key={item.id} {...item}/>)

    const handleClick = () => {
        setIsShowMore(!isShowMore)
    }

    if(renderedItems.length > 3 && !isShowMore) {
        renderedItems = renderedItems.slice(0, 2)
        renderedItems.push(<AnotherTopicsButton key={"another"} onClick={handleClick}/>)
    }

    renderedItems.push(<AddNewTopicButton key={"add"} onClick={addTopicHandler} topicsCount={channels.length} topicsMaxCount={35}/>)

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