import * as React from 'react';
import {BasicItem} from "../../styled/BasicItem";
import {Grid2, Typography} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const AddNewTopicButton = () => {
    return (
        <BasicItem>
            <Grid2
                container
                width={40}
                height={40}
                bgcolor={"primary.main"}
                borderRadius={"20%"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <AddIcon fontSize={"medium"}/>
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
                    Добавить тему
                </Typography>

                <Grid2
                    container
                    alignItems={"center"}
                    spacing={.5}
                >
                    <Typography
                        fontSize={"12px"}
                        fontWeight={500}
                        color={"text.secondary"}
                    >
                        1/10
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
            </Grid2>
        </BasicItem>
    );
};