import * as React from 'react';
import {Grid2} from "@mui/material";
import {SubscibesPanel} from "../../subscribesPanel/SubscibesPanel";
import {ErrorPage} from "../errorPage/ErrorPage";
import {Loading} from "../loading/Loading";
import {useEffect, useReducer} from "react";
import {ItemType} from "../../ItemsList/item/Item";
import {getAllTopics, getUserTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";
import {profileReducer, setErrorAC, setLoadingAC, setTopicsAC} from "./profileReducer";
import {Header} from "./header/Header";

export const Profile: React.FC = () => {

    const user = tg.initDataUnsafe.user!;

    const [{error, isLoading, topics}, dispatch] = useReducer(profileReducer, {
        error: null,
        isLoading: true,
        topics: []
    })


    useEffect(() => {
        getAllTopics()
            .then(
                (result) => getUserTopics(user.id).then(
                    (checkedTopics) => {
                        dispatch(setLoadingAC(false));
                        dispatch(setTopicsAC(result.map((topic: ItemType) => {
                            for (let i = 0; i < checkedTopics.length; i++)
                                if (checkedTopics[i].id === topic.id)
                                    return {...topic, checked: true}

                            return {...topic, checked: false}
                        })));
                    },
                    (error) => dispatch(setErrorAC(error))
                ),
                (error) => dispatch(setErrorAC(error))
            )
    }, [])

    tg.BackButton.hide()

    if (error) return <ErrorPage error={error}/>;
    if (isLoading) return <Loading/>;

    tg.MainButton.show()
    tg.MainButton.setParams({
        text: "Поделиться интересами"
    })
    tg.MainButton.onClick(() => {
    })

    const editTopicsHandler = () => {
    }

    const editChannelsHandler = () => {
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

                <SubscibesPanel
                    editHandler={editTopicsHandler}
                    title={"Темы"}
                    sx={{marginTop: "8px"}}
                    items={topics.filter(topic => topic.checked)}
                />

                <SubscibesPanel
                    editHandler={editChannelsHandler}
                    title={"Каналы"}
                    sx={{marginTop: "8px"}}
                    items={[]}
                />

            </Grid2>
        </>
    );
};