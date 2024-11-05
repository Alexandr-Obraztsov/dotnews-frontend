import * as React from 'react';
import {Divider, Stack} from "@mui/material";
import {tg} from "../../../globalTheme";
import {Channel} from "../../common/channel/Channel";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useParams} from "react-router-dom";
import {deleteDigestChannelAC} from "../../../store/channelsReducer";
import {deleteDigestChannelsAPI} from "../../../api/api";


export const ChannelList : React.FC = () => {
    const {digestId = ""} = useParams()

    const channels = useAppSelector(state => state.channels[digestId])

    const dispatch = useAppDispatch()

    return (
        <Stack
            divider={<Divider color={tg.themeParams.section_separator_color}/>}
            bgcolor={tg.themeParams.bg_color}
        >
            {channels.map(channel => {

                const onDeleteHandler = () => {
                    dispatch(deleteDigestChannelAC({digestId, channel: channel}))
                    deleteDigestChannelsAPI({telegramId: tg.initDataUnsafe.user!.id, digestId, channelId: channel.id})
                }

                return <Channel key={channel.id} {...channel} onDelete={onDeleteHandler}/>
            })}
        </Stack>
    );
};