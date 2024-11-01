import * as React from 'react';
import {BasicItem} from "../../styled/BasicItem";
import {Grid2, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {globalTheme} from "../../../globalTheme";

type AddNewTopicButtonPropsType = {
    onClick: () => void,
    topicsCount: number,
    topicsMaxCount: number
}


export const AddNewChannelButton : React.FC<AddNewTopicButtonPropsType> = ({onClick, topicsCount, topicsMaxCount}) => {
    return (
        <BasicItem onClick={onClick}>
            <Grid2
                container
                width={28}
                height={28}
                margin={"8.5px"}
                color={"primary.main"}
                borderRadius={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
                border={`2px solid ${globalTheme.palette.primary.main}`}
                fontSize={"22px"}
            >
                <AddIcon fontSize={"inherit"} sx={{position: "absolute"}}/>
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
                    fontWeight={400}
                    color={"primary.main"}
                >
                    Добавить канал
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
                        {topicsCount}/{topicsMaxCount}
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