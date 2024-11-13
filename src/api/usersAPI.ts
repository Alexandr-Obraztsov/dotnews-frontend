щimport { server_url } from "../config";
import axios from "axios";
import { UserType } from "../store/userReducer";

export const getAllUsersAPI = () => {
    return axios.get(`${server_url}/users`).then((res) => res.data);
};

export const setUserAPI = (payload: { telegramId: number; telegramName: string }): Promise<UserType> => {
    return axios
        .post(`${server_url}/users`, {
            ...payload,
            timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
        .then((res) => res.data);
};

export const getUserAPI = (telegramId: number): Promise<UserType> => {
    return axios.get(`${server_url}/users/${telegramId}`).then((res) => res.data);
};
