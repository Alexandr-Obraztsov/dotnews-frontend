import * as React from 'react';
import {Popup, PopupPropsType} from "../popup/Popup";
import {Chip, Grid2} from "@mui/material";
import {getTopicEmoji, ItemType} from "../../topicsList/item/Item";
import {useState} from "react";
import {subscribeToTopics, unsubscribeFromTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";

type EditTopicsPopupPropsType = {
    items: ItemType[],
    updateItems: (items: ItemType[]) => void
} & PopupPropsType;

export const EditTopicsPopup: React.FC<EditTopicsPopupPropsType> = ({open, closePopup, updateItems, ...props}) => {

    const [items, setItems] = useState(props.items);


    const onClosePopup = () => {
        subscribeToTopics(tg.initDataUnsafe.user!.id, items.filter(item => item.checked).map(item => item.id))
        unsubscribeFromTopics(tg.initDataUnsafe.user!.id, items.filter(item => !item.checked).map(item => item.id))
        updateItems(items)
        closePopup();
    }

    return (
        <Popup
            title={"Топики"}
            open={open}
            closePopup={onClosePopup}
            sx={{
                width: "90%",
                minHeight: "400px",
            }}
        >
            <>
                <Grid2
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                    marginTop={"10px"}
                >
                    {items.map(item => {
                            const onClickHandler = () => {
                                item.checked = !item.checked;
                                setItems([...items]);
                            }

                            return (
                                <Chip
                                    color={"primary"}
                                    icon={<div>{getTopicEmoji(item.name, 20)}</div>}
                                    variant={item.checked ? "filled" : "outlined"}
                                    label={item.name}
                                    key={item.id}
                                    onClick={onClickHandler}
                                />
                            )
                        }
                    )}
                </Grid2>
            </>
        </Popup>
    )
        ;
};