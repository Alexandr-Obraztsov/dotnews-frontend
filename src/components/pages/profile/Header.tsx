import * as React from 'react';
import {Box, Grid2, Typography} from "@mui/material";
import {tg} from "../../../globalTheme";
import background from "../../../assets/images/background.jpg"
import {memo} from "react";

export const Header: React.FC = memo(() => {
    const user = tg.initDataUnsafe.user!;

    return (
        <Box
            padding={"10px"}
            bgcolor={"background.paper"}

        >
            <Grid2
                container
                direction={"column"}
                alignItems={"center"}
            >
                <img
                    src={background}
                    alt={"background"}
                    style={{
                        width: "100%",
                        height: "140px",
                        borderRadius: "5px",
                        objectFit: "cover",
                    }}
                />

                <Grid2
                    container
                    direction={"column"}
                    alignItems={"center"}
                    marginTop={"15px"}
                >
                    <Typography
                        variant={"h2"}
                        fontSize={"20px"}
                        fontWeight={500}
                        letterSpacing={"0.3px"}
                    >
                        {user.first_name} {user.last_name}
                    </Typography>

                    <Typography
                        color={"text.secondary"}
                        fontSize={"13px"}
                        fontWeight={380}
                        marginTop={"-2px"}
                    >
                        @{user.username || "unknown"}
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
})