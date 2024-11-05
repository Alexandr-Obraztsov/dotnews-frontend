import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {
    getDigestChannelsAPI,
    getDigestsAPI,
    getUserAPI,
} from "../../../api/api";
import {tg} from "../../../globalTheme";
import {useAppDispatch} from "../../../store/hooks";
import {setUserAC, setUserDigestsAC} from "../../../store/userReducer";
import {ROUTES} from "../../../appRouter";
import {setDigestChannelsAC} from "../../../store/channelsReducer";


export const Autorization = () => {
    const navigate = useNavigate()

    const [loadingDescription, setLoadingDescription] = useState<string>("")

    const dispatch = useAppDispatch()

    const loadUser = async () => {
        try {
            setLoadingDescription("Распознаем Вас...")
            const user = await getUserAPI(tg.initDataUnsafe.user!.id).then(res => res.json())
            dispatch(setUserAC(user))
            setLoadingDescription("Получаем Ваши дайджесты...")
            const digests = await getDigestsAPI(tg.initDataUnsafe.user!.id).then(res => res.json())
            dispatch(setUserDigestsAC(digests))
            for (const digest of digests) {
                const channels = await getDigestChannelsAPI(tg.initDataUnsafe.user!.id, digest.id).then(res => res.json())
                dispatch(setDigestChannelsAC({digestId:digest.id, channels}))
            }
            navigate(ROUTES.profile)
        }
        catch (e: any) {
            navigate(ROUTES.welcome)
        }
    }

    useEffect(() => {
        loadUser()
    }, [navigate]);

    return <Loading description={loadingDescription}/>
};