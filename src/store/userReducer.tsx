import {ChannelType} from "../components/channel/Channel";

export type UserStateType = {
    uuid: string,
    channels: ChannelType[],
}

const initialState : UserStateType = {
    uuid: "",
    channels: [],
}

export const userReducer = (state: UserStateType = initialState, action: UserActionType): UserStateType => {
    switch (action.type) {
        case "SET-USER-UUID":
            return {...state, uuid: action.payload.uuid}
        case "SET-USER-CHANNELS":
            return {...state, channels: action.payload.channels}
        case "ADD-USER-CHANNEl":
            return {...state, channels: [...state.channels, action.payload.channel]}
        default:
            return state
    }
}

export const setUserUuidAC = (uuid: string) => {
    return {type: "SET-USER-UUID", payload: {uuid}} as const
}

export const setUserChannelsAC = (channels: ChannelType[]) => {
    return {type: "SET-USER-CHANNELS", payload: {channels}} as const
}

export const addUserChannelAC = (channel: ChannelType) => {
    return {type: "ADD-USER-CHANNEl", payload: {channel}} as const
}

type SetUserUuidActionType = ReturnType<typeof setUserUuidAC>

type SetUserChannelsActionType = ReturnType<typeof setUserChannelsAC>

type AddUserChannelActionType = ReturnType<typeof addUserChannelAC>

type UserActionType = SetUserUuidActionType
    | SetUserChannelsActionType
    | AddUserChannelActionType
