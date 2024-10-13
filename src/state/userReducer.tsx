import {ItemType} from "../components/ItemsList/item/Item";

export type UserStateType = {
    uuid: string,
    topics: ItemType[],
    channels: ItemType[]
}

const initialState : UserStateType = {
    uuid: "",
    topics: [],
    channels: []
}

export const userReducer = (state: UserStateType = initialState, action: UserActionType): UserStateType => {
    switch (action.type) {
        case "SET-USER-UUID":
            return {...state, uuid: action.payload.uuid}
        case "SET-USER-TOPICS":
            return {...state, topics: action.payload.topics}
        case "SET-USER-CHANNELS":
            return {...state, channels: action.payload.channels}
        default:
            return state
    }
}

export const setUserUuidAC = (uuid: string) => {
    return {type: "SET-USER-UUID", payload: {uuid}} as const
}

export const setUserTopicsAC = (topics: ItemType[]) => {
    return {type: "SET-USER-TOPICS", payload: {topics}} as const
}

export const setUserChannelsAC = (channels: ItemType[]) => {
    return {type: "SET-USER-CHANNELS", payload: {channels}} as const
}

type SetUserUuidActionType = ReturnType<typeof setUserUuidAC>

type SetUserTopicsActionType = ReturnType<typeof setUserTopicsAC>

type SetUserChannelsActionType = ReturnType<typeof setUserChannelsAC>

type UserActionType = SetUserUuidActionType
    | SetUserTopicsActionType
    | SetUserChannelsActionType
