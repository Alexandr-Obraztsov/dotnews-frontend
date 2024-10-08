import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {checkUser} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";


export const Autorization = () => {
    const navigate = useNavigate()

    const [error, setError] = useState<Error | null>(null);

    checkUser(tg.initDataUnsafe.user!.id).then(
        (result) => result.code === 200 ? navigate("/profile") : navigate("/welcome"),
        (error) => navigate("/welcome")
    )

    if (error)
        return <ErrorPage error={error}/>
    else
        return <Loading/>
};