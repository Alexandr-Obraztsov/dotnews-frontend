import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Grid2, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import AddIcon from "@mui/icons-material/Add";
import {PATHS} from "../../../app/appRouter";
import {EditableDigestName} from "./EditableDigestName";
import {EditableDigestTime} from "./EditableDigestTime";
import SettingsIcon from '@mui/icons-material/Settings';

export const Main: React.FC = () => {

    const {digestId = ""} = useParams()

    const navigate = useNavigate()

    const onChannelAddClick = () => {
        navigate(PATHS.addChannel.replace(":digestId", digestId))
    }

    const handleClickDigestSettings = () => {
        navigate(PATHS.digestTimeEditPage.replace(":digestId", digestId))
    }

    return (
        <Box
            bgcolor={"background.paper"}
        >
            <Grid2
                container
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingTop={"15px"}
            >
                <Box
                    width={"50px"}
                    height={"50px"}
                    sx={{
                        background: "linear-gradient(180deg, #D9D9D9 0%, #737373 100%)",
                        marginBottom: "10px",
                    }}
                ></Box>

                <EditableDigestName/>

                <EditableDigestTime onClick={handleClickDigestSettings}/>

                <Grid2
                    container
                    width={"100%"}
                    justifyContent={"space-between"}
                    padding={"17.5px 20px 12.5px"}
                >
                    <Grid2
                        container
                        alignItems={"center"}
                        wrap={"nowrap"}
                        onClick={handleClickDigestSettings}
                        color={tg.themeParams.subtitle_text_color}
                        fontSize={"15px"}
                        gap={"2px"}
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <Typography
                            fontSize={"13px"}
                            fontWeight={400}
                            lineHeight={"normal"}
                        >
                            Настройки
                        </Typography>
                        <SettingsIcon fontSize={"inherit"} color={"inherit"}/>
                    </Grid2>

                    <Grid2
                        container
                        alignItems={"center"}
                        wrap={"nowrap"}
                        onClick={onChannelAddClick}
                        color={tg.themeParams.link_color}
                        gap={"2px"}
                        fontSize={"15px"}
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <Typography
                            fontSize={"13px"}
                            fontWeight={400}
                            lineHeight={"normal"}
                        >
                            Добавить канал
                        </Typography>
                        <AddIcon fontSize={"inherit"} color={"inherit"}/>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};