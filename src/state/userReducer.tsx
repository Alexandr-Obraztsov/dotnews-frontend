import {ItemType} from "../components/ItemsList/item/Item";

export type UserStateType = {
    uuid: string,
    channels: ItemType[],
}

const initialState : UserStateType = {
    uuid: "",
    channels: [],
}

export const userReducer = (state: UserStateType = initialState, action: UserActionType): UserStateType => {
    switch (action.type) {
        case "SET-USER-UUID":
            return {...state, uuid: action.payload.uuid}
        case "SET-USER-ChannelS":
            return {...state, channels: action.payload.channels}
        case "ADD-USER-Channel":
            return {...state, channels: [...state.channels, action.payload.channel]}
        default:
            return state
    }
}

export const setUserUuidAC = (uuid: string) => {
    return {type: "SET-USER-UUID", payload: {uuid}} as const
}

export const setUserChannelsAC = (channels: ItemType[]) => {
    return {type: "SET-USER-ChannelS", payload: {channels}} as const
}

export const addUserChannelAC = (channel: ItemType) => {
    return {type: "ADD-USER-Channel", payload: {channel}} as const
}

type SetUserUuidActionType = ReturnType<typeof setUserUuidAC>

type SetUserChannelsActionType = ReturnType<typeof setUserChannelsAC>

type AddUserChannelActionType = ReturnType<typeof addUserChannelAC>

type UserActionType = SetUserUuidActionType
    | SetUserChannelsActionType
    | AddUserChannelActionType
