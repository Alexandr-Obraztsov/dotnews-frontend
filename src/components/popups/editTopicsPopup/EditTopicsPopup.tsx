import * as React from 'react';
import {Popup, PopupPropsType} from "../popup/Popup";
import {Autocomplete, Chip, Grid2, TextField} from "@mui/material";
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

    const onChangeHandler = (event: any, values: ItemType[]) => {
        setItems([...items].map(item => {
            if (values.includes(item)) {
                return {...item, checked: true}
            } else {
                return {...item, checked: false}
            }
        }))
    }

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
                <Autocomplete
                    multiple
                    forcePopupIcon={false}
                    options={items}
                    getOptionLabel={(option: ItemType) => option.name}
                    value={items.filter((item: ItemType) => item.checked)}
                    renderTags={(items: ItemType[], getTagProps) =>
                        items.map((item: ItemType, index: number) => {
                            return (
                                <Chip
                                    icon={
                                        <div style={{transform: "TranslateX(3px)"}}>
                                            {getTopicEmoji(item.name, 25)}
                                        </div>
                                    }
                                    color={"primary"}
                                    variant="filled"
                                    label={item.name}
                                    {...getTagProps({index})}
                                    key={item.id}
                                />
                            );
                        })
                    }
                    noOptionsText={"Не найдено"}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Выбери топики"
                            size={"small"}
                        />
                    )}
                    onChange={onChangeHandler}
                />
                <Grid2
                    container
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={0.5}
                    marginTop={"10px"}
                >
                    {items.filter(item => !item.checked).map(item => {
                            const onClickHandler = () => {
                                item.checked = !item.checked;
                                setItems([...items]);
                            }

                            return (
                                <Chip
                                    icon={<div style={{transform: "TranslateX(3px)"}}>{getTopicEmoji(item.name, 25)}</div>}
                                    color={"primary"}
                                    variant="outlined"
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