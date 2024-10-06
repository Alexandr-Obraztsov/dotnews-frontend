import * as React from 'react';
import {Backdrop, CircularProgress, Divider, Grid2} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {configs} from "../../configs";
import {ItemType} from "../../components/topicsList/item/Item";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {Shadow} from "../../components/styled/Shadow";
import {StyledButton} from "../../components/styled/StyledButton";
import {theme} from "../../index";
import {Loading} from "../loading/Loading";
import {ErrorPage} from "../error/ErrorPage";
import {TopicsList} from "../../components/topicsList/TopicsList";
import {sendMetrics} from "../../SendMetrics";


export const Topics: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<ItemType[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe.user!.id;

    const navigate = useNavigate()

    const checkedItemsCount = items.filter(item => item.checked).length;

    useEffect(() => {
        fetch(`${configs.url}/api/topics`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.map((item: ItemType) => ({...item, checked: false})));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    const handleClick = (id: string) => {
        setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }

    const onSubmit = () => {
        const checkedTopics = items.filter(item => item.checked).map(item => item.id);
        sendMetrics("InterestsSetupFinished")
        fetch(`${configs.url}/api/subscribtions/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userTelegramId: userId,
                topicIds: checkedTopics
            })
        })
            .then(
                (result) => {
                    if (result.statusText === "OK")
                        navigate("/finishSetup")
                    else
                        setError(new Error(result.statusText))
                },
                (error) => {
                    setError(error.message)
                }
            )
    }

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate("/welcome")
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
                   sx={{}}
            >

                <Header marginBlockStart={"40px"}>
                    Топики
                </Header>

                <Body1
                    marginBlockStart={"-10px"}
                    marginBlockEnd={"10px"}
                    paddingX={"50px"}
                >
                    Выберите интересующие вас темы
                </Body1>

                <Divider flexItem/>

                <TopicsList sx={{
                    paddingX: "25px",
                    marginTop: "25px",
                    marginBottom: checkedItemsCount ? "130px" : "25px",
                }} items={items} clickCallback={handleClick}/>

            </Grid2>

            <Shadow
                height={"200px"}
                bottom={"0"}
                color={`${theme.palette.background.default} 10%`}
                style={{opacity: checkedItemsCount ? 1 : 0}}
            />
            <StyledButton
                variant={"contained"}
                size={"large"}
                sx={{
                    transition: "0.5s",
                    visibility: !checkedItemsCount ? "hidden" : 'visible',
                    opacity: checkedItemsCount ? 1 : 0,
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                }}
                onClick={onSubmit}
            >
                Дальше
            </StyledButton>
        </>
    );
};