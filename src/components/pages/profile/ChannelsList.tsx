import * as React from 'react';
import {Channel, ChannelType} from "../../common/channel/Channel";
import {Divider, Stack, SxProps} from "@mui/material";
import {memo} from "react";
import {AddNewChannelButton} from "./AddNewChannelButton";

type ChannelsListPropsType = {
    addTopicHandler: () => void
    channels: ChannelType[],
    sx?: SxProps
};

export const ChannelsList : React.FC<ChannelsListPropsType> = memo(({channels, sx, addTopicHandler}) => {

    let renderedItems = channels.map(item => <Channel key={item.id} {...item}/>)

    renderedItems.unshift(<AddNewChannelButton key={"add"} onClick={addTopicHandler} topicsCount={channels.length} topicsMaxCount={50}/>)

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