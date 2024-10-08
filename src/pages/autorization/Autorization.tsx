import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {configs} from "../../configs";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";

export const Autorization = () => {
    const navigate = useNavigate()

    const tg = window.Telegram.WebApp;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const userId = tg.initDataUnsafe.user!.id;
        fetch(`${configs.url}/api/users/${userId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.code === 204)
                        navigate("/welcome")
                    else
                        navigate("/profile")
                },
                (error) => setError(error)
            )
    }, []);

    if(error)
        return <ErrorPage error={error}/>
    else
        return <Loading/>
};