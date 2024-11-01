// @flow
import * as React from 'react';
import {Dayjs} from "dayjs";
import {MobileTimePicker} from "@mui/x-date-pickers";

type SuperTimePickerPropsType = {
    onChange: (value: Dayjs | null) => void
    value: Dayjs | null
};
export const SuperTimePicker : React.FC<SuperTimePickerPropsType> = ({onChange, value}) => {
    return (
        <MobileTimePicker
            onChange={onChange}
            ampm={false}
            ampmInClock={false}
            disableIgnoringDatePartForTimeValidation={true}
            value={value}
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
    );
};