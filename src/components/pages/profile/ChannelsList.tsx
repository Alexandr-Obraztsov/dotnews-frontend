import * as React from 'react';
import {Channel, ChannelType} from "../../common/channel/Channel";
import {Divider, Stack, SxProps} from "@mui/material";
import {AnotherChannelsButton} from "./AnotherChannelsButton";
import {memo, useState} from "react";
import {AddNewChannelButton} from "./AddNewChannelButton";

type ChannelsListPropsType = {
    addTopicHandler: () => void
    channels: ChannelType[],
    sx?: SxProps
};

export const ChannelsList : React.FC<ChannelsListPropsType> = memo(({channels, sx, addTopicHandler}) => {

    const [isShowMore, setIsShowMore] = useState(false);

    let renderedItems = channels.map(item => <Channel key={item.id} {...item}/>)

    const handleClick = () => {
        setIsShowMore(!isShowMore)
    }

    if(renderedItems.length > 4 && !isShowMore) {
        renderedItems = renderedItems.slice(0, 2)
        renderedItems.push(<AnotherChannelsButton key={"another"} onClick={handleClick} items={channels.slice(2, 5)}/>)
    }

    renderedItems.push(<AddNewChannelButton key={"add"} onClick={addTopicHandler} topicsCount={channels.length} topicsMaxCount={35}/>)

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
})