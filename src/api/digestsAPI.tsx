import axios from "axios";
import {DigestType} from "../components/common/digest/Digest";

const server_url = "https://dotnewsbot.ru/back_api/api"


export const getDigestsAPI = (telegramId: number) : Promise<DigestType[]> => {
    return axios.get(`${server_url}/users/${telegramId}/digests`).then(res => res.data)
}

export const createDigestAPI = async (telegramId: number, payload: {
    name: string,
    timeInterval: string,
    firstReceptionTime: string
}) => {
    return axios.post(`${server_url}/users/${telegramId}/digests`, {
        name: payload.name,
        timeInterval: payload.timeInterval,
        firstReceptionTime: payload.firstReceptionTime
    }).then(res => res.data)
}

export const getDigestChannelsAPI = (telegramId: number, digestId: string) => {
    return axios.get(`${server_url}/users/${telegramId}/digests/${digestId}/channels`).then(res => res.data)
}

export const addDigestChannelsAPI = (payload: {telegramId: number, digestId: string, name: string}) => {
    return axios.post(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels`, {
        name: payload.name
    }).then(res => res.data)
}

export const deleteDigestChannelsAPI = (payload: {telegramId: number, digestId: string, channelId: string}) => {
    return axios.delete(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels/${payload.channelId}`).then(res => res.data)
}

export const updateDigestAPI = (payload: {telegramId: number, digestId: string, name: string, timeInterval: string}) => {
    return axios.put(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}`, {
        name: payload.name,
        timeInterval: payload.timeInterval
    })
}