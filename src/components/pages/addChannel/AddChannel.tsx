import * as React from 'react';
import {Box, Grid2, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {tg} from "../../../globalTheme";
import {useNavigate} from "react-router-dom";

export const AddChannel: React.FC = () => {

    const [link, setLink] = useState<string>("")

    const navigate = useNavigate()

    const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        const line = event.currentTarget.value.trim().slice(13).replace("https://t.me/", "").replace("@", "")

        setLink(line)
    }

    if (link) {
        tg.MainButton.setParams({
            text: "Добавить канал",
        })
        tg.MainButton.onClick(() => {
            navigate("/profile")
        })
        tg.MainButton.show()
    } else {
        tg.MainButton.hide()
    }


    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"50px 20px 20px"}
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
                    value={"https://t.me/" + link}
                    variant={"filled"}
                    size={"small"}
                    fullWidth={true}
                    onChange={handleLinkChange}
                    sx={{
                        "& input": {
                            padding: "8px"
                        }
                    }}
                />

                <Typography
                    marginTop={"10px"}
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
        </Grid2>
    );
};