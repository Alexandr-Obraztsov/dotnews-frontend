import * as React from 'react';
import {Avatar, Grid2, Typography} from "@mui/material";
import {SubscibesPanel} from "../../subscribesPanel/SubscibesPanel";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {ItemType} from "../../topicsList/item/Item";
import {getUserTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";

export const Profile: React.FC = () => {

    const user = tg.initDataUnsafe.user!;
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<(ItemType)[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getUserTopics(user.id).then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    tg.BackButton.hide()

    if (error) return <ErrorPage error={error}/>;
    if (!isLoaded) return <Loading/>;

    tg.MainButton.show()
    tg.MainButton.setParams({
        text: "Поделиться интересами"
    })
    tg.MainButton.onClick(() => {
    })

    const editHandler = () => {
        tg.MainButton.hide()
        navigate("/topicsEditor")
    }

    return (
        <Grid2
            marginX={"20px"}
            container
            direction={"column"}
            height={"100vh"}
            wrap={"nowrap"}
        >
            <Grid2
                container
                marginBlockStart={"10px"}
                direction={"row"}
                alignItems={"center"}
                gap={"10px"}
            >
                <Avatar
                    src={user.photo_url}
                    sx={{width: "50px", height: "50px"}}
                />

                <Grid2
                    container
                    direction={"column"}
                >
                    <Typography
                        variant={"h2"}
                        fontSize={"20px"}
                        fontWeight={450}
                    >
                        {user.first_name} {user.last_name}
                    </Typography>

                    <Typography
                        color={"text.secondary"}
                    >
                        @{user.username || "unknown"}
                    </Typography>
                </Grid2>
            </Grid2>

            <SubscibesPanel
                editHandler={editHandler}
                sx={{marginTop: "30px"}}
                title={"Темы"}
                items={items}
            />

        </Grid2>
    );
};