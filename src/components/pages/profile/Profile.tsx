import * as React from 'react';
import {Avatar, Grid2, Typography} from "@mui/material";
import {SubscibesPanel} from "../../subscribesPanel/SubscibesPanel";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {Loading} from "../loading/Loading";
import {useEffect, useReducer, useState} from "react";
import {ItemType} from "../../topicsList/item/Item";
import {getAllTopics, getUserTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";
import {Popup} from "../../popups/popup/Popup";
import {profileReducer, ProfileStateType, setErrorAC, setItemsAC, setLoadingAC, setOpenPopupAC} from "./profileReducer";
import {EditTopicsPopup} from "../../popups/editTopicsPopup/EditTopicsPopup";

export const Profile: React.FC = () => {

    const user = tg.initDataUnsafe.user!;

    const [{openPopup, error, isLoading, items}, dispatch] = useReducer(profileReducer,{
        openPopup: false,
        error: null,
        isLoading: true,
        items: []
    })

    console.log(items);

    useEffect(() => {
        getAllTopics()
            .then(
                (result) => getUserTopics(user.id).then(
                    (checkedTopics) => {
                        dispatch(setLoadingAC(false));
                        dispatch(setItemsAC(result.map((item: ItemType) => {
                            for (let i = 0; i < checkedTopics.length; i++)
                                if (checkedTopics[i].id === item.id)
                                    return {...item, checked: true}

                            return {...item, checked: false}
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

    const editHandler = () => {
        dispatch(setOpenPopupAC(true))
    }

    return (
        <>
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
                    items={items.filter(item => item.checked)}
                />

            </Grid2>
            <EditTopicsPopup
                items={items}
                open={openPopup}
                updateItems={(items: ItemType[]) => dispatch(setItemsAC(items))}
                closePopup={()=>dispatch(setOpenPopupAC(false))}
            />
        </>
    );
};