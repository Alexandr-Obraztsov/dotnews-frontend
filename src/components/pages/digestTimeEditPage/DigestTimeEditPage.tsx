import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../store/hooks";
import {Box, Grid2, Typography} from "@mui/material";
import {Wheel} from "../../common/TimePicker/Wheel";
import {useEffect} from "react";
import {tg} from "../../../globalTheme";
import {PATHS} from "../../../app/appRouter";
import dayjs from "dayjs";

export const DigestTimeEditPage : React.FC = () => {
    const {digestId = ""} = useParams()
    const digest = useAppSelector(state => state.user.digests).find(dg => dg.id === digestId)!;

    const hours = +dayjs(digest.receptionTime, "HH:mm:ss").format("HH")!;
    const minutes = +dayjs(digest.receptionTime, "HH:mm:ss").format("mm")!;

    const [time, setTime] = React.useState({
        hours,
        minutes,
    })

    const navigate = useNavigate()

    const convertNumberToTime = (relative: number) => {
        return relative < 10 ? `0${relative}` : `${relative}`
    }

    const handleUpdateHours = (hours: number) => {
        return convertNumberToTime(hours)
    }

    const handleUpdateMinutes = (minutes: number) => {
        return convertNumberToTime(minutes)
    }

    const handleSave = () => {
        navigate(PATHS.digestPage.replace(":digestId", digestId))
    }

    useEffect(()=>{
        tg.BackButton.onClick(() => navigate(PATHS.digestPage.replace(":digestId", digestId)))
    }, [navigate])

    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            height={"100vh"}
            bgcolor={"background.paper"}
            paddingX={"20px"}
        >
            <Typography
                fontSize={"24px"}
                fontWeight={600}
            >
                {digest.name}
            </Typography>

            <Grid2
                container
                height={"150px"}
                marginTop={"20px"}
                wrap={"nowrap"}
                gap={"40px"}
                position={"relative"}
                width={"100%"}
                justifyContent={"center"}
                direction={"row"}
            >
                <Wheel
                    loop
                    initIdx={hours}
                    wheelSize={14}
                    slidesPerView={8}
                    length={23}
                    width={40}
                    setValue={handleUpdateHours}
                />

                <Wheel
                    loop
                    initIdx={minutes}
                    wheelSize={14}
                    slidesPerView={8}
                    length={60}
                    width={40}
                    setValue={handleUpdateMinutes}
                />

                <Grid2
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                    position={"absolute"}
                    bgcolor={"background.default"}
                    width={"100%"}
                    height={"35px"}
                    top={"50%"}
                    borderRadius={"5px"}
                    zIndex={0}
                    sx={{
                        transform: "translateY(-50%)"
                    }}
                >
                    <Typography
                        fontSize={"25px"}
                        lineHeight={"25px"}
                        fontWeight={700}
                        paddingBottom={"3px"}
                    >
                        :
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2
                container
                alignItems={"center"}
                justifyContent={"center"}
                marginTop={"20px"}
                width={"100%"}
                height={"50px"}
                borderRadius={"5px"}
                bgcolor={"background.default"}
                onClick={handleSave}
            >
                <Typography
                    fontSize={"16px"}
                    fontWeight={400}
                    color={"primary"}
                >
                    Сохранить
                </Typography>
            </Grid2>
        </Grid2>
    );
};