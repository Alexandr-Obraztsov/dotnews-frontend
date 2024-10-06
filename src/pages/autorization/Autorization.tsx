import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {configs} from "../../configs";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../error/ErrorPage";

export const Autorization = () => {
    const navigate = useNavigate()

    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe.user!.id;

    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
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

    if (error) return <ErrorPage/>

    return (
        <></>
    );
};