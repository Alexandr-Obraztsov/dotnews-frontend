import React from "react";
import {Grid2, Skeleton} from "@mui/material";
import {BasicItem} from "../../styled/BasicItem";



export const LoadingChannel: React.FC = () => {

    return (
        <BasicItem
        >
            <Skeleton
                variant="circular"
                width={45}
                height={45}
            />
            <Grid2
                container
                direction={"column"}
                spacing={0.5}
                marginLeft={"13px"}
            >
                <Skeleton
                    variant="rectangular"
                    width={100}
                    height={16}
                />

                <Skeleton
                    variant="rectangular"
                    width={60}
                    height={12}
                />
            </Grid2>
        </BasicItem>
    )
}