import * as React from 'react';
import {useEffect, useState} from "react";
import {ItemType} from "../../topicsList/item/Item";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {Loading} from "../loading/Loading";
import {Divider, Grid2} from "@mui/material";
import {Header} from "../../styled/Header";
import {Body1} from "../../styled/Body1";
import {TopicsList} from "../../topicsList/TopicsList";
import {getAllTopics, getUserTopics, subscribeToTopics, unsubscribeFromTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";


export const TopicsEditor = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);

    const [topics, setTopics] = useState<ItemType[]>([]);

    const [error, setError] = useState<Error | null>(null);


    const userId = tg.initDataUnsafe.user!.id;

    const navigate = useNavigate()

    useEffect(() => {
        getAllTopics()
            .then(
                (result) => getUserTopics(userId).then(
                    (checkedTopics) => {
                        setLoaded(true);
                        setTopics(result.map((item: ItemType) => {
                            for (let i = 0; i < checkedTopics.length; i++)
                                if (checkedTopics[i].id === item.id)
                                    return {...item, checked: true}

                            return {...item, checked: false}
                        }));
                    },
                    (error) => setError(error)
                ),
                (error) => setError(error)
            )
    }, [])

    const handleClick = (id: string) => {
        setTopics(topics.map(item => {
            if (item.id === id) {
                (item.checked ? unsubscribeFromTopics(userId, [item.id]) : subscribeToTopics(userId, [item.id]))
                    .then(
                        (res) => {},
                        (error) => setError(error)
                    );
                return {...item, checked: !item.checked};
            } else
                return item;
        }))
    }

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate("/profile")
    })


    if (error) return <ErrorPage error={error}/>;

    if (!isLoaded) return <Loading/>;

    return (
        <>
            <Grid2 container
                   direction={"column"}
                   alignItems={"center"}
                   height={"100vh"}
                   wrap={"nowrap"}
            >

                <Header marginBlockStart={"40px"}>
                    Темы
                </Header>

                <Body1
                    marginBlockStart={"-10px"}
                    marginBlockEnd={"10px"}
                    paddingX={"50px"}
                >
                    Выберите интересующие Вас темы
                </Body1>

                <Divider flexItem/>

                <TopicsList
                    items={topics}
                    clickCallback={handleClick}
                    sx={{
                        paddingX: "25px",
                        marginY: "25px",
                    }}
                />

            </Grid2>
        </>
    );
};