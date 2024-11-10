import axios from "axios";
import {DigestType} from "../components/common/digest/Digest";

const server_url = "https://dotnewsbot.ru/back_api/api"


export const getDigestsAPI = (telegramId: number) : Promise<DigestType[]> => {
    return axios.get(`${server_url}/users/${telegramId}/digests`).then(res => res.data)
}

export const createDigestAPI = async (telegramId: number, payload: {
    name: string,
    timeInterval: string,
    receptionTime: string,
    emoji: string
}) => {
    return axios.post(`${server_url}/users/${telegramId}/digests`, payload).then(res => res.data)
}

export const getDigestChannelsAPI = (telegramId: number, digestId: string) => {
    return axios.get(`${server_url}/users/${telegramId}/digests/${digestId}/channels`).then(res => res.data)
}

export const addDigestChannelsAPI = (payload: {telegramId: number, digestId: string, name: string}) => {
    return axios.post(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels`, {
        name: payload.name
    }).then(res => res.data)
}

export const deleteUserDigestAPI = (payload: {userTelegramId: number, digestId: string}) => {
    return axios.delete(`${server_url}/users/${payload.userTelegramId}/digests/${payload.digestId}`).then(res => res.data)
}

export const deleteDigestChannelsAPI = (payload: {telegramId: number, digestId: string, channelId: string}) => {
    return axios.delete(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels/${payload.channelId}`).then(res => res.data)
}

export const updateDigestAPI = (telegramId: number, digest: DigestType) => {
    return axios.put(`${server_url}/users/${telegramId}/digests/${digest.id}`, {
        name: digest.name,
        timeInterval: digest.timeInterval,
        receptionTime: digest.receptionTime,
        emoji: digest.emoji
    })
}