import * as React from 'react';
import {Divider, Stack} from "@mui/material";
import {memo} from "react";
import {tg} from "../../../globalTheme";
import {Digest} from "../../common/digest/Digest";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../appRouter";
import {useAppSelector} from "../../../store/hooks";


export const DigestList : React.FC = memo(() => {
    const navigate = useNavigate()

    const digests = useAppSelector(state => state.user.digests)
    const channels = useAppSelector(state => state.channels)

    return (
        <Stack
            paddingX={"20px"}
            divider={<Divider color={tg.themeParams.section_separator_color}/>}
            bgcolor={tg.themeParams.bg_color}
        >
            {digests.map(digest => {
                const onClickHandler = () => navigate(ROUTES.digestPage.replace(":digestId", digest.id))

                const digestChannels = channels[digest.id]

                return (
                    <Digest key={digest.id} {...digest} channels={digestChannels.length >= 3 ? digestChannels.slice(0, 3) : digestChannels} onClick={onClickHandler}/>
                )
            })}
        </Stack>
    );
})