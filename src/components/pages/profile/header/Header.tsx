// @flow
import * as React from 'react';
import {Avatar, Grid2, Typography} from "@mui/material";
import {tg} from "../../../../globalTheme";


export const Header : React.FC = () => {
    const user = tg.initDataUnsafe.user!;

    return (
        <Grid2
            container
            bgcolor={"background.paper"}
            direction={"column"}
            alignItems={"center"}
            padding={"10px 20px 20px"}
        >
            <Avatar
                src={user.photo_url}
                sx={{width: "90px", height: "90px"}}
            />

            <Typography
                marginBlockStart={"10px"}
                variant={"h2"}
                fontSize={"18px"}
                fontWeight={400}
                letterSpacing={"0.3px"}
            >
                {user.first_name} {user.last_name}
            </Typography>

            <Typography
                color={"text.secondary"}
                marginBlockStart={"-5px"}
                fontSize={"13px"}
                fontWeight={380}
            >
                @{user.username || "unknown"}
            </Typography>
        </Grid2>
    );
};