import * as React from 'react';
import {Avatar, Box, Grid2, Typography} from "@mui/material";
import {globalTheme, tg} from "../../../../globalTheme";
import ShareIcon from '@mui/icons-material/Share';
import TuneIcon from '@mui/icons-material/Tune';
import ChatIcon from '@mui/icons-material/Chat';
import TopicIcon from '@mui/icons-material/Topic';
import styled from '@emotion/styled';

export const Header: React.FC = () => {
    const user = tg.initDataUnsafe.user!;

    user.photo_url = "https://a.d-cd.net/10f913as-960.jpg"

    return (
        <Box
            padding={"20px 10px"}
            bgcolor={"background.paper"}

        >
            <Grid2
                container
                direction={"column"}
                alignItems={"center"}
            >
                <Avatar
                    src={user.photo_url}
                    sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                    }}
                />

                <Grid2
                    container
                    direction={"column"}
                    marginLeft={"10px"}
                    alignItems={"center"}
                    marginTop={"5px"}
                >
                    <Typography
                        variant={"h2"}
                        fontSize={"18px"}
                        fontWeight={400}
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
            <Grid2
                container
                direction={"row"}
                justifyContent={"space-around"}
                marginTop={"25px"}
            >

                <StyledButton>
                    <StyledIcon>
                        <ShareIcon fontSize={"inherit"} sx={{transform: "Translate(-1px, 1px)"}}/>
                    </StyledIcon>
                    Поделиться
                </StyledButton>

                <StyledButton>
                    <StyledIcon>
                        <ChatIcon fontSize={"inherit"} sx={{transform: "Translate(0.2px, 1px)"}}/>
                    </StyledIcon>
                    Каналы
                </StyledButton>

                <StyledButton>
                    <StyledIcon>
                        <TopicIcon fontSize={"inherit"} sx={{transform: "Translate(0.3px, 0.2px)"}}/>
                    </StyledIcon>
                    Топики
                </StyledButton>

               <StyledButton>
                   <StyledIcon>
                       <TuneIcon fontSize={"inherit"} sx={{transform: "Translate(0.5x, 1px)"}}/>
                   </StyledIcon>
                   Настройки
               </StyledButton>
            </Grid2>
        </Box>
    );
};

const StyledIcon = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    padding: 0,
    borderRadius: "50%",
    fontSize: "18px",
    fontWeight: "normal",
    backgroundColor: globalTheme.palette.primary.contrastText,
    border: "none",
    color: globalTheme.palette.background.paper,
})

const StyledButton = styled.button({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    gap: "5px",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    letterSpacing: "0.2px",
    fontSize: "13px",
    color: globalTheme.palette.primary.contrastText,
})