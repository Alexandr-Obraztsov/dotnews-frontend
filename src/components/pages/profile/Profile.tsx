import * as React from 'react';
import {Grid2} from "@mui/material";
import {ItemType} from "../../ItemsList/item/Item";
import {tg} from "../../../globalTheme";
import {Header} from "./header/Header";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {setUserTopicsAC} from "../../../state/userReducer";
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

    return (
        <>
            <Grid2
                container
                direction={"column"}
                wrap={"nowrap"}
                paddingBottom={"12px"}
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