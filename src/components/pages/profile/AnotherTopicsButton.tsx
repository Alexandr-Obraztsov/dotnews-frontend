import * as React from 'react';
import {BasicItem} from "../../styled/BasicItem";
import {Box, Grid2, Skeleton, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AnotherTopicsButton : React.FC<{onClick?: () => void}> = ({onClick}) => {
    return (
        <BasicItem onClick={onClick}>
            <Grid2
                container
                alignItems={"center"}
            >
                <Box
                    position={"relative"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={50}
                    height={50}
                >
                    <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{position: "absolute", top: "0", left: "0"}}
                    />

                    <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{position: "absolute", top: "0", right: "0"}}
                    />
                    <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)"}}
                    />
                </Box>

                <Typography
                    marginLeft={"10px"}
                    fontSize={"16px"}
                    fontWeight={500}
                >
                    Другие темы
                </Typography>

                <ExpandMoreIcon fontSize={"small"}/>
            </Grid2>
        </BasicItem>
    );
};