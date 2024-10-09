import * as React from 'react';
import {Popup, PopupPropsType} from "../popup/Popup";
import {Autocomplete, Chip, Grid2, TextField} from "@mui/material";
import {ItemType} from "../../topicsList/item/Item";
import {useState} from "react";
import {subscribeToTopics, unsubscribeFromTopics} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";
import CloseIcon from "@mui/icons-material/Close";

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
                    readOnly={true}
                    popupIcon={<></>}
                    options={items}
                    getOptionLabel={(option: ItemType) => option.name}
                    value={items.filter((item: ItemType) => item.checked)}
                    renderTags={(sortedItems: ItemType[], getTagProps) =>
                        sortedItems.map((item: ItemType, index: number) => {
                            const onClickHandler = () => {
                                item.checked = !item.checked;
                                setItems([...items]);
                            }

                            return (
                                <Chip
                                    color={"primary"}
                                    variant="filled"
                                    label={item.name}
                                    {...getTagProps({index})}
                                    key={item.id}
                                    onClick={onClickHandler}
                                    onDelete={onClickHandler}
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