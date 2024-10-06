import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {configs} from "../../configs";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../error/ErrorPage";
import {PagePropsType, PathType} from "../../App";

export const Autorization : React.FC<PagePropsType> = ({setPath}) => {

    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe.user!.id;

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${configs.url}/api/users/${userId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.code === 204)
                        setPath("welcome")
                    else
                        setPath("profile")
                },
                (error) => setError(userId.toString())
            )
    }, []);

    if (error) return <>{error}<ErrorPage/></>

    return (
        <></>
    );
};