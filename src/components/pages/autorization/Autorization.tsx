import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {
    getUserAPI,
    getUserSubscribtionsAPI,
} from "../../../api/api";
import {tg} from "../../../globalTheme";
import {useAppDispatch} from "../../../store/hooks";
import {setUserAC, setUserChannelsAC, UserType} from "../../../store/userReducer";
import {ChannelType} from "../../common/channel/Channel";


export const Autorization = () => {
    const navigate = useNavigate()

    const [error, setError] = useState<Error | null>(null);

    const dispatch = useAppDispatch()

    const loadUser = useCallback(async (user: UserType) => {
        try {
            const subscribtions : ChannelType[] = await getUserSubscribtionsAPI(user.id)
            dispatch(setUserAC(user))
            dispatch(setUserChannelsAC(subscribtions))
            navigate("/profile")
        } catch (e: Error | any) {
            setError(e)
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        getUserAPI(tg.initDataUnsafe.user!.id).then(
            (result) => loadUser(result),
            () => navigate("/welcome")
        )
    }, [loadUser, navigate]);

    if (error)
        return <ErrorPage error={error}/>
    else
        return <Loading/>
};