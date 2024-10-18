import * as React from 'react';
import {BasicItem} from "../../../styled/BasicItem";
import {Grid2, Skeleton, Typography} from "@mui/material";


export const AnotherTopicsButton : React.FC<{onClick?: () => void}> = ({onClick}) => {
    return (
        <BasicItem onClick={onClick}>
            <Grid2
                container
                alignItems={"center"}
                spacing={1.5}
            >
                <Skeleton
                    variant={"rounded"}
                    width={40}
                    height={40}
                />

                <Typography>
                    Другие темы
                </Typography>
            </Grid2>
        </BasicItem>
    );
};