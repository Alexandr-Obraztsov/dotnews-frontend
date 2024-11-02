import * as React from 'react';
import {BasicChannel} from "../../styled/BasicChannel";
import {Box, Grid2, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChannelType} from "../../common/channel/Channel";

type AnotherChannelsButtonPropsType = {
    onClick?: () => void
    items: ChannelType[]
}

export const AnotherChannelsButton : React.FC<AnotherChannelsButtonPropsType> = ({onClick, items}) => {
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
                    <img
                        src={items[0].imageUrl}
                        alt={items[0].title}
                        width={30}
                        height={30}
                        style={{position: "absolute", top: "0", left: "0", borderRadius: "50%"}}
                    />

                    <img
                        src={items[1].imageUrl}
                        alt={items[1].title}
                        width={30}
                        height={30}
                        style={{position: "absolute", top: "0", right: "0", borderRadius: "50%"}}
                    />

                    <img
                        src={items[2].imageUrl}
                        alt={items[2].title}
                        width={30}
                        height={30}
                        style={{position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", borderRadius: "50%"}}
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