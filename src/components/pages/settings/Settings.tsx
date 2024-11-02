
import * as React from 'react';
import {Box, Grid2, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {tg} from "../../../globalTheme";
import dayjs, {Dayjs} from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ROUTES} from "../../../appRouter";
import {updateUserDigestReceptionTimeAPI} from "../../../api/api";
import {setUserDigestReceptionTimeAC} from "../../../store/userReducer";
import {useCallback, useEffect} from "react";
import {SuperTimePicker} from "../../common/superTimePicker/SuperTimePicker";


export const Settings : React.FC = () => {

    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    let timePickerTime = dayjs(user.digestReceptionTime, "HH:mm:ss")


    const onMainButtonClickHandler = useCallback(() => {
        const time = timePickerTime.format("HH:mm:ss")
        dispatch(setUserDigestReceptionTimeAC(time))
        updateUserDigestReceptionTimeAPI(user.telegramId, time)
        navigate(ROUTES.profile)
    }, [user, timePickerTime, navigate, dispatch])

    const onTimePickerChange = (newValue: Dayjs | null) => {
        if (newValue) {
            timePickerTime = newValue
            console.log(timePickerTime.format("HH:mm:ss"));
        }
    }

    useEffect(() => {
        tg.BackButton.show()
        tg.BackButton.onClick(() => {
            navigate(ROUTES.profile)
        })

        tg.MainButton.hide()
        tg.MainButton.setParams({
            text: "Cохранить"
        })
        tg.MainButton.onClick(onMainButtonClickHandler)
        tg.MainButton.show()
    }, [navigate, onMainButtonClickHandler]);

    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            padding={"40px 20px"}
            height={"100vh"}
        >
            <Typography
                fontSize={"23px"}
                fontWeight={450}
                marginX={"50px"}
                textAlign={"center"}
            >
                Настройки
            </Typography>

            <Box
                marginTop={"30px"}
                width={"100%"}
            >
                <SuperTimePicker onChange={onTimePickerChange} value={timePickerTime}/>
            </Box>
        </Grid2>
    );
};