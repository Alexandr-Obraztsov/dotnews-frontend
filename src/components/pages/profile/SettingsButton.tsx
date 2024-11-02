import * as React from 'react';
import {BasicChannel} from "../../styled/BasicChannel";
import {Grid2, Typography} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type SettingsButtonPropsType = {
    onClick?: () => void
}

export const SettingsButton : React.FC<SettingsButtonPropsType> = ({onClick}) => {
    return (
        <BasicChannel onClick={onClick}>
            <Grid2
                container
                width={40}
                height={40}
                bgcolor={"gray"}
                borderRadius={"20%"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <TuneIcon fontSize={"medium"}/>
            </Grid2>

            <Grid2
                container
                flexGrow={1}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Typography
                    marginLeft={"13px"}
                    fontSize={"16px"}
                    fontWeight={500}
                >
                    Настройки
                </Typography>

                <Grid2
                    container
                    alignItems={"center"}
                    fontSize={15}
                    color={"text.secondary"}
                >
                    <ArrowForwardIosIcon fontSize={"inherit"} color={"inherit"}/>
                </Grid2>
            </Grid2>
        </BasicChannel>
    );
};