import * as React from 'react';
import {BasicChannel} from "../../styled/BasicChannel";
import {Box, Grid2, Skeleton, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AnotherChannelsButton : React.FC<{onClick?: () => void}> = ({onClick}) => {
    return (
        <BasicChannel onClick={onClick}>
            <Grid2
                container
                alignItems={"center"}
            >
                <Box
                    position={"relative"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={45}
                    height={45}
                >
                    <Skeleton
                        variant="circular"
                        width={30}
                        height={30}
                        sx={{position: "absolute", top: "0", left: "0"}}
                    />

                    <Skeleton
                        variant="circular"
                        width={30}
                        height={30}
                        sx={{position: "absolute", top: "0", right: "0"}}
                    />
                    <Skeleton
                        variant="circular"
                        width={30}
                        height={30}
                        sx={{position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)"}}
                    />
                </Box>

                <Typography
                    marginLeft={"13px"}
                    fontSize={"16px"}
                    fontWeight={500}
                >
                    Другие темы
                </Typography>

                <ExpandMoreIcon fontSize={"small"}/>
            </Grid2>
        </BasicChannel>
    );
};