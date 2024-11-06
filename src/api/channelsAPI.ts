import {server_url} from "../config";
import axios from "axios";
import {ChannelType} from "../components/common/channel/Channel";


export const getAllChannelsAPI = () : Promise<ChannelType[]> => {
    return axios.get(`${server_url}/channels`).then(res => res.data)
}

export const getChannelAPI = (telegramName: string) : Promise<ChannelType> => {
    return axios.get(`${server_url}/channels/${telegramName}`).then(res => res.data)
}

export const addChannelAPI = (telegramName: string) => {
    return axios.post(`${server_url}/channels`, {
        telegramName
    }).then(res => res.data)
}