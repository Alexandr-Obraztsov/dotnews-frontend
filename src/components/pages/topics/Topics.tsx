import * as React from 'react';
import {Divider, Grid2} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ItemType} from "../../topicsList/item/Item";
import {Header} from "../../styled/Header";
import {Body1} from "../../styled/Body1";
import {Shadow} from "../../styled/Shadow";
import {StyledButton} from "../../styled/StyledButton";
import {Loading} from "../loading/Loading";
import {ErrorPage} from "../errorPage/ErrorPage";
import {TopicsList} from "../../topicsList/TopicsList";
import {getAllTopics, sendMetrics, subscribeToTopics} from "../../../backFetches/BackFetches";
import {globalTheme, tg} from "../../../globalTheme";


export const Topics: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<ItemType[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const userId = tg.initDataUnsafe.user!.id;

    const navigate = useNavigate()

    const checkedItemsCount = items.filter(item => item.checked).length;

    useEffect(() => {
        getAllTopics()
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.map((item: ItemType) => ({...item, checked: false})));
                },
                (error) => setError(error)
            )
    }, [])


    const handleClick = (id: string) => {
        setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }

    const onSubmit = () => {
        const checkedTopics = items.filter(item => item.checked).map(item => item.id);
        sendMetrics(userId, "InterestsSetupFinished")
        subscribeToTopics(userId, checkedTopics).then(
                (result) => result.statusText !== "OK" && setError(new Error(result.statusText)),
                (error) => setError(error.message)
            )
        navigate("/finishSetup")
    }

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate("/")
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

                <TopicsList
                    items={items}
                    clickCallback={handleClick}
                    sx={{
                        paddingX: "25px",
                        marginTop: "25px",
                        marginBottom: checkedItemsCount ? "130px" : "25px",
                    }}
                />

            </Grid2>

            <Shadow
                height={"200px"}
                bottom={"0"}
                color={`${globalTheme.palette.background.default} 10%`}
                style={{opacity: checkedItemsCount ? 1 : 0}}
            />

            <StyledButton onClick={onSubmit}>
                Дальше
            </StyledButton>
        </>
    );
};