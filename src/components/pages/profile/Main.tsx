import * as React from 'react';
import {Box, Grid2, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import {memo} from "react";
import AddIcon from '@mui/icons-material/Add';
import {ROUTES} from "../../../appRouter";
import {useNavigate} from "react-router-dom";
import {createDigestAPI} from "../../../api/api";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {addUserDigestAC} from "../../../store/userReducer";

export const Main: React.FC = memo(() => {
    const user = tg.initDataUnsafe.user!;

    const navigate = useNavigate()

    const digests = useAppSelector( state => state.user.digests)

    const dispatch = useAppDispatch()

    const onDigestAddClick = () => {
        let digest_num = 1
        while (digests.map(dg => dg.name).includes(`Новый Дайджест ${digest_num}`)) digest_num++
        createDigestAPI(user.id, {name: `Новый Дайджест ${digest_num}`, timeInterval: "1.00:00:00", firstReceptionTime: "2024-11-04T20:00:00.000Z"})
            .then(res => res.json())
            .then(res => {
                dispatch(addUserDigestAC(res))
                navigate(ROUTES.digestPage.replace(":digestId", res.id))
            })
    }

    return (
        <Box
            bgcolor={"background.paper"}
        >
            <Grid2
                container
                direction={"column"}
                alignItems={"center"}
            >
                <Box
                    width={"100px"}
                    height={"100px"}
                    borderRadius={"50%"}
                    marginTop={"15px"}
                    sx={{
                        background: "linear-gradient(180deg, #D9D9D9 0%, #737373 100%)",
                    }}
                ></Box>

                <Typography
                    fontSize={"20px"}
                    fontWeight={400}
                    marginTop={"10px"}
                    lineHeight={"normal"}
                >
                    {user.first_name} {user.last_name}
                </Typography>

                <Typography
                    color={"text.secondary"}
                    fontSize={"13px"}
                    fontWeight={400}
                    marginTop={"4px"}
                    lineHeight={"normal"}
                >
                    @{user.username || "unknown"}
                </Typography>

                <Grid2
                    container
                    width={"100%"}
                    justifyContent={"end"}
                    alignItems={"center"}
                    padding={"17.5px 20px 12.5px"}
                    color={tg.themeParams.link_color}
                    onClick={onDigestAddClick}
                >
                    <Typography
                        fontSize={"13px"}
                        fontWeight={400}
                        lineHeight={"normal"}
                    >
                        Создать дайджест
                    </Typography>
                    <AddIcon fontSize={"small"} color={"inherit"}/>
                </Grid2>
            </Grid2>
        </Box>
    );
})