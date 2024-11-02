import {globalTheme} from "../../globalTheme";
import React, {FC} from "react";
import {Box, BoxProps} from "@mui/material";

type BasicItemPropsType = BoxProps & {
    transform?: string,
    isDragging?: boolean
}

export const BasicChannel: FC<BasicItemPropsType> = ({
                                                         isDragging,
                                                         transform,
                                                         children,
                                                         ...props
                                                     }) => {
    return (
        <Box
            {...props}
            sx={{
                position: "relative",
                display: "flex",
                padding: "10px 15px",
                alignItems: "center",
                backgroundColor: globalTheme.palette.background.paper,
                overflow: "hidden",
                transform: transform,
                transition: isDragging ? "none" : "transform 0.3s ease",
                cursor: isDragging ? "grab" : "pointer",
                pointerEvents: "all"
            }}
        >
            {children}
        </Box>
    );
}