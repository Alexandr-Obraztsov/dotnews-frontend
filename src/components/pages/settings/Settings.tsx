
import * as React from 'react';
import {Box, Button, Grid2, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {tg} from "../../../globalTheme";
import {TimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ROUTES} from "../../../appRouter";
import {updateUserDigestReceptionTimeAPI} from "../../../api/api";
import {setUserDigestReceptionTimeAC} from "../../../store/userReducer";
import {useEffect} from "react";


export const Settings : React.FC = () => {

    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    let timePickerTime =dayjs(user.digestReceptionTime, "HH:mm:ss")


    const onMainButtonClickHandler = async () => {
        const time = timePickerTime.format("HH:mm:ss")
        console.log(time);
        dispatch(setUserDigestReceptionTimeAC(time))
        const res = await updateUserDigestReceptionTimeAPI(user.telegramId, time)
        console.log(res);
        navigate(ROUTES.profile)
    }

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
            text: "Готово"
        })
        tg.MainButton.onClick(onMainButtonClickHandler)
        tg.MainButton.show()
    }, []);

    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            padding={"40px 20px"}
            height={"100vh"}
        >
            <Button onClick={onMainButtonClickHandler}>
                test
            </Button>
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
                <TimePicker
                    onChange={onTimePickerChange}
                    desktopModeMediaQuery={"@media (min-width: 600px)"}
                    ampm={false}
                    ampmInClock={false}
                    value={timePickerTime}
                    label="Время рассылки"
                    minutesStep={5}
                    localeText={{
                        toolbarTitle: 'Время рассылки',
                        okButtonLabel: 'Ок',
                        cancelButtonLabel: 'Отмена',
                    }}
                    sx={{
                        width: "100%",
                        "input": {
                            paddingY: "10px",
                            width: "100%",
                        }
                    }}
                />
            </Box>
        </Grid2>
    );
};