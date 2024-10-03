import * as React from 'react';
import {Avatar, Grid2, Typography} from "@mui/material";
import {Header} from "../../components/styled/Header";
import {StyledButton} from "../../components/styled/StyledButton";


const userData = {
    name: "Anton",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtbqHaCfL1SJbRcFNETk6Sabc4goGiMiXpA&s",
    date: "01.01.2022",
    topics: ["some topic", "some topic", "some topic", "some topic", "some topic", "some topic", "some topic"],
    channels: ["some channel", "some channel", "some channel", "some channel", "some channel", "some channel", "some channel"],
}


export const Profile : React.FC = () => {
    return (
        <Grid2
            container
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
        >
            <Avatar src={userData.avatar} sx={{width: "130px", height: "130px"}}/>
            <Typography variant={"h4"} marginBlockStart={"15px"}>Anton</Typography>
            <Typography variant={"body2"} marginBlockStart={"5px"} color={"text.secondary"}>User since: {userData.date}</Typography>
            <StyledButton
                variant={"contained"}
                color={"primary"}
                size={"small"}
                sx={{marginTop: "15px"}}
            >Share your setup</StyledButton>
        </Grid2>
    );
};