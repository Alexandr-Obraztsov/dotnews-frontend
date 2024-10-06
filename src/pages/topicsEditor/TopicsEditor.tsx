import * as React from 'react';
import {useEffect, useState} from "react";
import {ItemType} from "../../components/topicsList/item/Item";
import {useNavigate} from "react-router-dom";
import {configs} from "../../configs";
import {ErrorPage} from "../error/ErrorPage";
import {Loading} from "../loading/Loading";
import {Divider, Grid2} from "@mui/material";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {Shadow} from "../../components/styled/Shadow";
import {theme} from "../../index";
import {StyledButton} from "../../components/styled/StyledButton";
import {TopicsList} from "../../components/topicsList/TopicsList";
import {PagePropsType} from "../../App";


export const TopicsEditor : React.FC<PagePropsType> = ({setPath}) => {
    const [isLoaded, setLoaded] = useState<boolean>(false);

    const [topics, setTopics] = useState<ItemType[]>([]);

    const [error, setError] = useState<Error | null>(null);

    const tg = window.Telegram.WebApp;

    const userId = tg.initDataUnsafe.user!.id;

    useEffect(() => {
        fetch(`${configs.url}/api/topics`)
            .then(res => res.json())
            .then(
                (topics) => {
                    fetch(`${configs.url}/api/topics?userId=${userId}`)
                        .then(res => res.json())
                        .then(
                            (checkedTopics) => {
                                setLoaded(true);
                                setTopics(topics.map((item: ItemType) => {
                                    for (let i = 0; i < checkedTopics.length; i++)
                                        if (checkedTopics[i].id === item.id)
                                            return {...item, checked: true}

                                    return {...item, checked: false}
                                }));
                            },
                            (error) => {

                                setError(error);
                            }
                        )
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])


    const handleClick = (id: string) => {
        setTopics(topics.map(item => {
            if (item.id === id) {
                const url = `${configs.url}/api/subscribtions/${item.checked ? "unsubscribe" : "subscribe"}`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userTelegramId: userId,
                        topicIds: [item.id]
                    })
                })
                    .then(res => {
                        if (res.status !== 204 && res.status !== 200)
                            setError(new Error(res.statusText))
                    }, (error) => {
                        setError(error)
                    });
                return {...item, checked: !item.checked};
            } else
                return item;
        }))
    }

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        setPath("profile")
    })


    if (error) return <ErrorPage/>;

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