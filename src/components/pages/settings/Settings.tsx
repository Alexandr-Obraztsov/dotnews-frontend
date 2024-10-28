
import * as React from 'react';
import {Box, Grid2, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {tg} from "../../../globalTheme";
import {MobileTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ROUTES} from "../../../appRouter";
import {updateUserDigestReceptionTimeAPI} from "../../../api/api";
import {setUserDigestReceptionTimeAC} from "../../../store/userReducer";


export const Settings : React.FC = () => {

    const navigate = useNavigate()

    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    const [digestReceptionTime, setDigestReceptionTime] = React.useState<Dayjs>(dayjs(user.digestReceptionTime, "HH:mm:ss"));

    const onMainButtonClickHandler = () => {
        const time = digestReceptionTime.format("HH:mm:ss");
        dispatch(setUserDigestReceptionTimeAC(time))
        updateUserDigestReceptionTimeAPI(user.telegramId, time)
        navigate(ROUTES.profile)
    }

    const onDateChangeHandler = (data: Dayjs | null) => data && setDigestReceptionTime(data)

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate(ROUTES.profile)
    })

    tg.MainButton.show()
    tg.MainButton.setParams({
        text: "Готово"
    })
    tg.MainButton.onClick(onMainButtonClickHandler)

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
                <MobileTimePicker
                    value={digestReceptionTime}
                    onChange={onDateChangeHandler}
                    ampm={false}
                    ampmInClock={false}
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