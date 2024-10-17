import * as React from 'react';
import {Grid2} from "@mui/material";
import {SubscibesPanel} from "../../subscribesPanel/SubscibesPanel";
import {ItemType} from "../../ItemsList/item/Item";
import {tg} from "../../../globalTheme";
import {Header} from "./header/Header";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {setUserTopicsAC} from "../../../state/userReducer";
import {registerUser} from "../../../backFetches/BackFetches";
import {TopicsList} from "./topicsList/TopicsList";

export type SubscribesType = {
    topics: ItemType[],
    channels: ItemType[]
}

export const Profile: React.FC = () => {



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {uuid, topics, channels} = useAppSelector(res => res.user);

    const dispatch = useAppDispatch()

    tg.BackButton.hide()


    const editTopicsHandler = (items: ItemType[]) => {
        dispatch(setUserTopicsAC(items));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editChannelsHandler =  () => {
    }

    return (
        <>
            <Grid2
                container
                direction={"column"}
                height={"100vh"}
                wrap={"nowrap"}
            >
                <Header/>

                <TopicsList
                    sx={{marginTop: "12px"}}
                    topics={topics}
                />

            </Grid2>
        </>
    );
};