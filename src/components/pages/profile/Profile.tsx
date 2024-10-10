import * as React from 'react';
import {Grid2} from "@mui/material";
import {SubscibesPanel} from "../../subscribesPanel/SubscibesPanel";
import {ErrorPage} from "../errorPage/ErrorPage";
import {Loading} from "../loading/Loading";
import {useEffect, useReducer} from "react";
import {ItemType} from "../../ItemsList/item/Item";
import {getAllTopics, getUserTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";
import {profileReducer, setErrorAC, setItemsAC, setLoadingAC, setOpenPopupAC} from "./profileReducer";
import {EditTopicsPopup} from "../../popups/editTopicsPopup/EditTopicsPopup";
import {Header} from "./header/Header";

export const Profile: React.FC = () => {

    const user = tg.initDataUnsafe.user!;

    const [{openPopup, error, isLoading, items}, dispatch] = useReducer(profileReducer, {
        openPopup: false,
        error: null,
        isLoading: true,
        items: []
    })


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
                container
                direction={"column"}
                height={"100vh"}
                wrap={"nowrap"}
            >
                <Header/>

                <SubscibesPanel
                    editHandler={editHandler}
                    title={"Темы"}
                    sx={{marginTop: "8px"}}
                    items={items.filter(item => item.checked)}
                />

            </Grid2>
            <EditTopicsPopup
                items={items}
                open={openPopup}
                updateItems={(items: ItemType[]) => dispatch(setItemsAC(items))}
                closePopup={() => dispatch(setOpenPopupAC(false))}
            />
        </>
    );
};