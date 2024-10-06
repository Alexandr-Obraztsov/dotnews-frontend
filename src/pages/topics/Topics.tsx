import * as React from 'react';
import {Backdrop, CircularProgress, Divider, Grid2} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {configs} from "../../configs";
import {ItemPropsType, ItemType} from "../../components/checkboxList/item/Item";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {CheckboxList} from "../../components/checkboxList/CheckboxList";
import {Shadow} from "../../components/styled/Shadow";
import {StyledButton} from "../../components/styled/StyledButton";
import {theme} from "../../index";
import {Loading} from "../loading/Loading";
import {ErrorPage} from "../error/ErrorPage";


export const Topics: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<(ItemType)[]>([]);
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
        navigate("/")
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
                    Topics
                </Header>

                <Body1
                    marginBlock={"10px"}
                    paddingX={"70px"}
                >
                    Choose the topics you are interested in
                </Body1>

                <Divider flexItem/>

                <CheckboxList items={items} paddingBottom={checkedItemsCount ? "130px" : "20px"}
                              clickCallback={handleClick}/>

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
                    bottom: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                }}
                onClick={onSubmit}
            >
                Next
            </StyledButton>
        </>
    );
};