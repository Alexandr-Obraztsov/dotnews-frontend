import * as React from 'react';
import {Grid2} from "@mui/material";
import {ChannelType} from "../../common/channel/Channel";
import {tg} from "../../../globalTheme";
import {Header} from "./Header";
import {useAppSelector} from "../../../store/hooks";
import {ChannelsList} from "./ChannelsList";
import {SettingsButton} from "./SettingsButton";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../appRouter";

export type SubscribesType = {
    channels: ChannelType[]
}

export const Profile: React.FC = () => {
    const navigate = useNavigate()

    const {channels} = useAppSelector(res => res.user);


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

    const onSettingClickHandler = () => {
        navigate(ROUTES.settings)
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

                <SettingsButton onClick={onSettingClickHandler}/>

            </Grid2>
        </>
    );
};