import * as React from 'react';
import {Box, Grid2, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import dayjs, {Dayjs} from "dayjs";
import {setUserDigestReceptionTimeAC} from "../../../store/userReducer";
import {updateUserDigestReceptionTimeAPI} from "../../../api/api";
import {ROUTES} from "../../../appRouter";
import {StyledButton} from "../../styled/StyledButton";
import {SuperTimePicker} from "../../common/superTimePicker/SuperTimePicker";


export const AddDigestTime : React.FC = () => {

    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    let timePickerTime = dayjs(user.digestReceptionTime, "HH:mm:ss")


    const onClickNext = () => {
        const time = timePickerTime.format("HH:mm:ss")
        dispatch(setUserDigestReceptionTimeAC(time))
        updateUserDigestReceptionTimeAPI(user.telegramId, time)
        navigate(ROUTES.finishSetup)
    }

    const onTimePickerChange = (newValue: Dayjs | null) => {
        if (newValue) {
            timePickerTime = newValue
            console.log(timePickerTime.format("HH:mm:ss"));
        }
    }

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
                Установите время рассылки
            </Typography>

            <Box
                marginTop={"30px"}
                width={"100%"}
            >
                <SuperTimePicker onChange={onTimePickerChange} value={timePickerTime}/>
            </Box>
            <StyledButton onClick={onClickNext}>
                Далее
            </StyledButton>
        </Grid2>
    );
};