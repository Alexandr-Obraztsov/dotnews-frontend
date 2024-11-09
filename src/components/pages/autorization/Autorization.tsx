import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    getDigestChannelsAPI,
    getDigestsAPI,
} from "../../../api/digestsAPI";
import {tg} from "../../../globalTheme";
import {useAppDispatch} from "../../../store/hooks";
import {setUserAC, setUserDigestsAC} from "../../../store/userReducer";
import {PATHS} from "../../../app/appRouter";
import {setDigestChannelsAC} from "../../../store/channelsReducer";
import {getUserAPI} from "../../../api/usersAPI";


export const Autorization = () => {
    const navigate = useNavigate()

    const [loadingDescription, setLoadingDescription] = useState<string>("")

    const dispatch = useAppDispatch()

    const loadUser = useCallback(() => {
        try {
            const tgId = tg.initDataUnsafe.user!.id
            setLoadingDescription("Распознаем Вас...")
            getUserAPI(tgId)
                .then(data => {
                    dispatch(setUserAC(data))
                    console.log(data)
                    setLoadingDescription("Получаем Ваши дайджесты...")
                    getDigestsAPI(tgId)
                        .then(digests => {
                            dispatch(setUserDigestsAC(digests))
                            const promises = digests.map(digest => getDigestChannelsAPI(tgId, digest.id)
                                .then(channels => {
                                    dispatch(setDigestChannelsAC({digestId:digest.id, channels}))
                                }))
                            Promise.all(promises)
                                .then(res => {
                                    navigate(PATHS.profile)
                                })
                        })
                })
                .catch(e => navigate(PATHS.welcome))
        }
        catch (e: any) {
            navigate(PATHS.welcome)
        }
    }, [dispatch, navigate])

    useEffect(() => {
        loadUser()
    }, [loadUser]);

    return <Loading description={loadingDescription}/>
};