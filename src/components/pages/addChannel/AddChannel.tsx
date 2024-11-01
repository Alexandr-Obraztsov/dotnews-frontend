import * as React from 'react';
import {Box, Button, Grid2, InputAdornment, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {tg} from "../../../globalTheme";
import {useNavigate} from "react-router-dom";
import {addChannelAPI, getChannelAPI, subscribeToChannelAPI} from "../../../api/api";
import {useQuery} from "react-query";
import {Channel, ChannelType} from "../../common/channel/Channel";
import {LoadingChannel} from "../../common/channel/LoadingChannel";
import {useAppSelector} from "../../../store/hooks";
import {useDispatch} from "react-redux";
import {addUserChannelAC} from "../../../store/userReducer";


const fetchChannel = async (link: string) => {
    let res = await getChannelAPI(link)
    if (res.status === 200) {
        return await res.json()
    } else {
        res = await addChannelAPI(link)
        if (res.status === 201) {
            return await res.json()
        } else {
            throw new Error("Канал не найден")
        }
    }
}

export const AddChannel: React.FC = () => {
    const [link, setLink] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useAppSelector(state => state.user.user)
    const channels = useAppSelector(state => state.user.channels)

    const { data, isLoading, refetch, isError } = useQuery(
        "channel" + link,
        () => fetchChannel(link),
        {
            enabled: false,
            retry: false,
            refetchOnWindowFocus: false,
        }
    )

    const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        const line = event.currentTarget.value.trim().replace("https://t.me/", "").replace("@", "")
        setLink(line)
    }

    const onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && nextHandler()

    const nextHandler = () => refetch()

    const addChannelHandler = () => {
        if (!channels.some((item: ChannelType) => item.id === data.id)) {
            subscribeToChannelAPI(user.id, data.id)
            dispatch(addUserChannelAC(data))
        }
        navigate("/profile")
    }


    tg.BackButton.onClick(() => navigate("/profile"))
    tg.BackButton.show()

    tg.MainButton.hide()

    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            padding={"50px 20px 20px"}
            height={"100vh"}
        >
            <Typography
                fontSize={"23px"}
                fontWeight={450}
                marginX={"50px"}
                textAlign={"center"}
            >
                Введите ссылку на канал
            </Typography>

            <Box
                marginTop={"30px"}
            >
                <TextField
                    value={link}
                    variant={"filled"}
                    size={"small"}
                    fullWidth={true}
                    onChange={handleLinkChange}
                    onKeyUp={onKeyUpHandler}
                    error={isError}
                    helperText={isError ? "Канал не найден" : " "}
                    slotProps={{
                        input: {
                        startAdornment: (
                            <>https://t.me/</>
                        ),
                        }
                    }}
                    sx={{
                        "& input": {
                            padding: "8px",
                            paddingLeft: "0"
                        }
                    }}
                />
                <Typography
                    fontSize={"14px"}
                    lineHeight={"18px"}
                    fontWeight={400}
                    textAlign={"center"}
                    color={"text.secondary"}
                >
                    Вводить ссылку нужно в следующем формате:
                    <span style={{fontWeight: "bold"}}> https://t.me/имя_канала </span>,
                    <span style={{fontWeight: "bold"}}> @имя_канала</span> или
                    <span style={{fontWeight: "bold"}}> имя_канала</span>
                </Typography>
            </Box>
            <Box
                marginTop={"20px"}
                width={"100%"}
            >
                {isLoading
                    ? <LoadingChannel/>
                    : data && <Channel {...data}/>
                }
            </Box>
            <Grid2
                container
                justifyContent={"end"}
                direction={"column"}
                width={"100%"}
                flexGrow={1}
                display={link ? "flex" : "none"}
            >
                <Button
                    variant={"outlined"}
                    onClick={link ? data ? addChannelHandler : nextHandler : undefined}
                    sx={{
                        height: "40px",
                    }}
                >
                    {link ? data ? "Добавить канал" : "Далее" : ""}
                </Button>
            </Grid2>
        </Grid2>
    );
};