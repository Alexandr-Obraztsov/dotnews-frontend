import * as React from 'react';
import {Box, Divider, Grid2, IconButton, SxProps, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export type PopupPropsType = {
    open: boolean
    closePopup: () => void
    sx?: SxProps
}

type DefaultPopupPropsType = {
    children: React.ReactNode
    open: boolean
    closePopup: () => void
    title: string
    sx?: SxProps
}

export const Popup: React.FC<DefaultPopupPropsType> = ({open, closePopup, children, title, sx}) => {
    return (
        <>
            <Grid2
                container
                height={"100vh"}
                justifyContent={"center"}
                alignItems={"center"}
                position={"absolute"}
                sx={{
                    transition: "0.3s",
                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                    backdropFilter: "blur(2px)",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
            >
                <Grid2
                    container
                    direction={"column"}
                    bgcolor={"background.default"}
                    borderRadius={"10px"}
                    position={"relative"}
                    sx={{
                        opacity: open ? 1 : 0,
                        visibility: open ? "visible" : "hidden",
                        transition: "0.3s",
                        ...sx
                    }}
                >
                    <Grid2
                        container
                        padding={"10px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography
                            variant={"h2"}
                            fontSize={"20px"}
                            fontWeight={500}
                        >
                            {title}
                        </Typography>

                        <IconButton
                            sx={{
                                position: "absolute",
                                right: "0px",
                            }}

                            onClick={closePopup}
                            color={"primary"}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid2>
                    <Divider/>
                    <Box
                        flexGrow={1}
                        bgcolor={"background.paper"}
                        borderRadius={"0 0 10px 10px"}
                    >
                        {children}
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
};
