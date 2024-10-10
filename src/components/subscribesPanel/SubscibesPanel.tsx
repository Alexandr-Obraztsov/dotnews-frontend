import * as React from 'react';
import {Box, Divider, Grid2, SxProps, Typography} from "@mui/material";

import 'swiper/css';
import {ItemType} from "../ItemsList/item/Item";
import {ItemsList} from "../ItemsList/ItemsList";
import {globalTheme, tg} from "../../globalTheme";
import {useState} from "react";

type SubscibesPanelPropsType = {
    title: string
    items: ItemType[]
    saveTopics?: (items: ItemType[]) => void
    sx?: SxProps
};


export const SubscibesPanel: React.FC<SubscibesPanelPropsType> = ({title, items, sx, saveTopics}) => {

    const [editMode, setEditMode] = useState(false);
    const [itemsState, setItemsState] = useState<ItemType[]>(items);

    const editModeHandler = () => {
        setEditMode(prev => !prev)
    }


    const clickItemHandler = (id: string) => {
        setItemsState(itemsState.map(item => {
            if (item.id === id)
                return {...item, checked: !item.checked}
            return item
        }))
    }

    const renderedItems = editMode ? itemsState : itemsState.filter(item => item.checked)

    return (
        <Box
            sx={sx}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            bgcolor={"background.paper"}
            paddingY={"10px"}
        >
            <Grid2
                container
                wrap={"nowrap"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
                paddingX={"20px"}
                marginBottom={"5px"}
            >
                <Typography
                    variant={"h4"}
                    fontSize={"16px"}
                    fontWeight={400}
                >
                    {title}
                </Typography>

                <Typography
                    variant={"body1"}
                    fontSize={"14px"}
                    fontWeight={400}
                    color={editMode ? "success" : "primary.main"}

                    onClick={editModeHandler}
                >
                    {editMode ? "Сохранить" : "Редактировать"}
                </Typography>
            </Grid2>
            {renderedItems.length > 0 && <Divider/>}
            <Box
                marginTop={"10px"}
                paddingX={"20px"}
                bgcolor={"background.paper"}
                height={"100%"}
            >

                {renderedItems.length
                    ? <ItemsList items={renderedItems} onClick={editMode ? clickItemHandler : undefined}/>
                    : <Grid2
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography
                            variant={"body1"}
                            fontSize={"14px"}
                            fontWeight={400}
                            color={"text.secondary"}
                            sx={{
                                opacity: 0.3
                            }}
                        >
                            Здесь ничего нет...
                        </Typography>
                    </Grid2>
                }
            </Box>


        </Box>
    );
};