import * as React from 'react';
import {CircularProgress, Grid2} from "@mui/material";

export const Loading : React.FC = () => {
    return (
        <Grid2
            container
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CircularProgress color="primary"/>
        </Grid2>
    );
};