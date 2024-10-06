import * as React from 'react';
import {Divider, Grid2, InputAdornment, TextField} from "@mui/material";
import {Header} from "../../components/styled/Header";
import {Body1} from "../../components/styled/Body1";
import {CheckboxList} from "../../components/checkboxList/CheckboxList";
import {StyledButton} from "../../components/styled/StyledButton";
import {AccountCircle} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";
import {ItemType} from "../../components/checkboxList/item/Item";
import {v1} from "uuid";
import {Shadow} from "../../components/styled/Shadow";
import {theme} from "../../index";
import {useNavigate} from "react-router-dom";


export const Channels: React.FC = () => {
    const [items, setItems] = useState<ItemType[]>([])

    const navigate = useNavigate()
    const tg = window.Telegram.WebApp;
    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate(-1)
    })

    const handleClick = (id: string) => {
        setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }


    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );

    const checkedItemsCount = items.filter(item => item.checked).length

    return (
        <>
            <Grid2 container
                   direction={"column"}
                   alignItems={"center"}
                   height={"100vh"}
                   wrap={"nowrap"}
            >
                <Header marginBlockStart={"40px"}
                >
                    Channels
                </Header>
                <Body1
                    marginBlock={"10px"}
                    paddingX={"70px"}
                >
                    You can choose additional channels you want to read
                </Body1>

                <TextField
                    value={value}
                    onChange={handleChange}
                    variant={"outlined"}
                    placeholder={"Search"}
                    fullWidth={true}
                    size={"small"}

                    sx={{
                        margin: "20px 0 20px",
                        paddingX: "20px",
                        "&>div": {
                            backgroundColor: window.Telegram.WebApp.themeParams.secondary_bg_color
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            )
                        }
                    }}/>

                <Divider flexItem/>
                <CheckboxList items={filteredItems} paddingBottom={checkedItemsCount >= 3 ? "130px" : "10px"} clickCallback={handleClick}/>
            </Grid2>

            <Shadow
                height={"200px"}
                bottom={"0"}
                color={`${theme.palette.background.default} 10%`}
                style={{opacity: checkedItemsCount >= 3 ? 1 : 0}}
            />
            <StyledButton
                variant={"contained"}
                size={"large"}
                sx={{
                    transition: "0.5s",
                    visibility: checkedItemsCount < 3 ? "hidden" : 'visible',
                    opacity: checkedItemsCount > 2 ? 1 : 0,
                    position: "absolute",
                    bottom: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                }}
                href={"/finishSetup"}
            >
                Next
            </StyledButton>
        </>
    );
};