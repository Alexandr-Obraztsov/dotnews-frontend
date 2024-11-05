import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Grid2, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import AddIcon from "@mui/icons-material/Add";
import {ROUTES} from "../../../appRouter";
import {EditableDigestName} from "./EditableDigestName";

export const Main: React.FC = () => {

    const {digestId = ""} = useParams()

    const navigate = useNavigate()

    const onChannelAddClick = () => {
        navigate(ROUTES.addChannel.replace(":digestId", digestId))
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
                gap={"10px"}
                paddingTop={"15px"}
            >
                <Box
                    width={"50px"}
                    height={"50px"}
                    sx={{
                        background: "linear-gradient(180deg, #D9D9D9 0%, #737373 100%)",
                    }}
                ></Box>

                <EditableDigestName/>

                <Grid2
                    container
                    width={"100%"}
                    justifyContent={"end"}
                    alignItems={"center"}
                    padding={"17.5px 20px 12.5px"}
                    color={tg.themeParams.link_color}
                    onClick={onChannelAddClick}
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
                    <AddIcon fontSize={"small"} color={"inherit"}/>
                </Grid2>
            </Grid2>
        </Box>
    );
};