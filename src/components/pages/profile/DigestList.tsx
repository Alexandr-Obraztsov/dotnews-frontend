import * as React from 'react';
import {Divider, Stack} from "@mui/material";
import {memo} from "react";
import {tg} from "../../../globalTheme";
import {Digest} from "../../common/digest/Digest";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../appRouter";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteUserDigestAPI} from "../../../api/digestsAPI";
import {deleteUserDigestAC} from "../../../store/userReducer";

export const DigestList: React.FC = memo(() => {
    const navigate = useNavigate()

    const digests = useAppSelector(state => state.user.digests)
    const channels = useAppSelector(state => state.channels)

    const dispatch = useAppDispatch()

    return (
        <Stack
            divider={<Divider color={tg.themeParams.section_separator_color}/>}
            bgcolor={tg.themeParams.bg_color}
        >
            {digests.map((digest) => {
                const onClickHandler = () => navigate(ROUTES.digestPage.replace(":digestId", digest.id))

                const onDeleteHandler = () => {
                    deleteUserDigestAPI({userTelegramId: tg.initDataUnsafe.user!.id, digestId: digest.id})
                    dispatch(deleteUserDigestAC(digest.id))
                }

                const digestChannels = channels[digest.id]

                return (
                    <Digest key={digest.id} {...digest}
                            channels={digestChannels.slice(0, 3)}
                            onClick={onClickHandler}
                            onDelete={onDeleteHandler}
                    />
                )
            })}
        </Stack>
    );
})