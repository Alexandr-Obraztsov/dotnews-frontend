import * as React from 'react';
import {Grid2} from "@mui/material";
import {ItemType} from "../../ItemsList/item/Item";
import {tg} from "../../../globalTheme";
import {Header} from "./Header";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {addUserChannelAC} from "../../../state/userReducer";
import {ChannelsList} from "./ChannelsList";
import {SettingsButton} from "./SettingsButton";
import {AddNewTopicButton} from "./AddNewTopicButton";
import {v1} from "uuid";

export type SubscribesType = {
    topics: ItemType[],
    channels: ItemType[]
}

export const Profile: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {uuid, channels} = useAppSelector(res => res.user);

    const dispatch = useAppDispatch()

    tg.BackButton.hide()
    tg.MainButton.setParams({
        text: "Поделиться интересами",
    })
    tg.MainButton.show()

    const addTopicHandler = () => {
        if (channels.length < 35) {
            dispatch(addUserChannelAC({
                id: v1(),
                name: "Новый канал",
                tag: "",
            }))
        }
    }

    return (
        <>
            <Grid2
                container
                direction={"column"}
                wrap={"nowrap"}
                paddingBottom={"12px"}
                gap={"12px"}
            >
                <Header/>

                <AddNewTopicButton onClick={addTopicHandler} topicsCount={channels.length} topicsMaxCount={35}/>

                {channels && channels.length > 0 && <ChannelsList channels={channels}/>}

                <SettingsButton/>

            </Grid2>
        </>
    );
};