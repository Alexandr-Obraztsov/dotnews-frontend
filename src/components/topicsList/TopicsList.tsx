import * as React from 'react';
import {Item, ItemType} from "./item/Item";
import {Grid2, SxProps, Typography} from "@mui/material";
import {CSSProperties} from "react";
import Lottie from "lottie-react";
import Boy_emoji from "../../assets/emoji/Boy.json";
import Loopmoney from "../../assets/emoji/Loopmoney.json";
import Notebook from "../../assets/emoji/Notebook.json";

const getTopicEmoji = (name: string): React.ReactNode => {
    const emojiStyle: CSSProperties = {
        height: 60,
        backgroundColor: 'transparent'
    }

    switch (name) {
        case "Information Technologies":
            return <Lottie
                animationData={Boy_emoji}
                loop={true}
                style={emojiStyle}
            />
        case "Crypto":
            return <Lottie
                animationData={Loopmoney}
                loop={true}
                style={emojiStyle}
            />
        case "Startups":
            return <Lottie
                animationData={Notebook}
                loop={true}
                style={emojiStyle}
            />
    }
}

type TopicsListPropsType = {
    items: ItemType[]
    clickCallback?: (id: string) => void
    sx?: SxProps
}

export const TopicsList : React.FC<TopicsListPropsType> = ({items, clickCallback, sx}) => {

    return (
        <Grid2
            container
            sx={sx}
            width={"100%"}
            justifyContent={"flex-start"}
            spacing={1}
            columns={3}
        >
            {items.map(item =>
                <Item id={item.id} name={item.name} key={item.id} checked={item.checked} clickCallback={clickCallback}/>
            )}
        </Grid2>
    );
};