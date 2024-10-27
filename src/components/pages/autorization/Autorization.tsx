import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {
    getUserAPI,
    getUserSubscribtionsAPI,
} from "../../../api/api";
import {tg} from "../../../globalTheme";
import {useAppDispatch} from "../../../store/hooks";
import {setUserChannelsAC, setUserUuidAC} from "../../../store/userReducer";


export const Autorization = () => {
    const navigate = useNavigate()

    const [error, setError] = useState<Error | null>(null);

    const dispatch = useAppDispatch()

    const loadUser = async (userUuid: string) => {
        try {
            const subscribtions = await getUserSubscribtionsAPI(userUuid)
            dispatch(setUserUuidAC(userUuid))
            dispatch(setUserChannelsAC(subscribtions))
            navigate("/profile")
        } catch (e: Error | any) {
            setError(e)
        }
    }

    useEffect(() => {
        getUserAPI(tg.initDataUnsafe.user!.id).then(
            (result) => loadUser(result.id),
            () => navigate("/welcome")
        )
    }, []);

    if (error)
        return <ErrorPage error={error}/>
    else
        return <Loading/>
};