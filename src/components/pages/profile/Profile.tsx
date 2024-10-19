import * as React from 'react';
import {Grid2} from "@mui/material";
import {ItemType} from "../../ItemsList/item/Item";
import {tg} from "../../../globalTheme";
import {Header} from "./Header";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {addUserChannelAC} from "../../../state/userReducer";
import {ChannelsList} from "./ChannelsList";
import {SettingsButton} from "./SettingsButton";
import {useNavigate} from "react-router-dom";

export type SubscribesType = {
    topics: ItemType[],
    channels: ItemType[]
}

export const Profile: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate()

    const {uuid, channels} = useAppSelector(res => res.user);

    const dispatch = useAppDispatch()

    tg.BackButton.hide()
    tg.MainButton.setParams({
        text: "Поделиться интересами",
    })
    tg.MainButton.show()

    const addTopicHandler = () => {
        if (channels.length < 35) {
            navigate("/addChannel")
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

                <ChannelsList channels={channels} addTopicHandler={addTopicHandler}/>

                <SettingsButton/>

            </Grid2>
        </>
    );
};