import * as React from 'react';
import {BasicItem} from "../../styled/BasicItem";
import {Grid2, Typography} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const SettingsButton = () => {
    return (
        <BasicItem>
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
                    marginLeft={"10px"}
                    fontSize={"16px"}
                    fontWeight={500}
                >
                    Управление дайджестами
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
        </BasicItem>
    );
};