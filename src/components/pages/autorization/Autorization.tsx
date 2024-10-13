import * as React from 'react';
import {Loading} from "../loading/Loading";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorPage} from "../errorPage/ErrorPage";
import {checkUser, getAllTopics, getUserTopics, registerUser} from "../../../backFetches/BackFetches";
import {tg} from "../../../globalTheme";
import {useAppDispatch} from "../../../state/hooks";
import {setUserTopicsAC, setUserUuidAC} from "../../../state/userReducer";
import {ItemType} from "../../ItemsList/item/Item";


export const Autorization = () => {
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<Error | null>(null);

    const dispatch = useAppDispatch()

    const loadUser = async (userUuid: string) => {
        const allTopics = await getAllTopics()
        const userTopics = await getUserTopics(userUuid)
        const topics = allTopics.map((topic: ItemType) => {
            for (let i = 0; i < userTopics.length; i++)
                if (userTopics[i].id === topic.id)
                    return {...topic, checked: true}

            return {...topic, checked: false}
        })

        dispatch(setUserUuidAC(userUuid))
        dispatch(setUserTopicsAC(topics))

        // TODO Добавить загрузку каналов

        navigate("/profile")
    }

    const createUser = async () => {
        const res = await registerUser(tg.initDataUnsafe.user!.id)
        const allTopics = await getAllTopics()
        const topics = allTopics.map((topic: ItemType) => {
            return {...topic, checked: false}
        })
        dispatch(setUserUuidAC(res.id));
        dispatch(setUserTopicsAC(topics))
        navigate("/welcome")
    }

    useEffect(() => {

        checkUser(tg.initDataUnsafe.user!.id).then(
            (result) => loadUser(result.id),
            (error) => createUser()
        )
    }, []);

    if (error)
        return <ErrorPage error={error}/>
    else
        return <Loading/>
};