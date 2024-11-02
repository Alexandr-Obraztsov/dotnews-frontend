import {ChannelType} from "../components/common/channel/Channel";
import {tg} from "../globalTheme";

export type UserStateType = {
    user: UserType
    channels: ChannelType[],
}

export type UserType = {
    id: string,
    telegramId: number,
    digestReceptionTime: string,
    createdAt: string,
    nextDigestReceptionDate: string
}

const initialState: UserStateType = {
    user: {
        id: "",
        telegramId: tg.initDataUnsafe.user!.id,
        createdAt: "",
        digestReceptionTime: "09:00:00",
        nextDigestReceptionDate: "",
    },
    channels: [],
}

export const userReducer = (state: UserStateType = initialState, action: UserActionType): UserStateType => {
    switch (action.type) {
        case "SET-USER":
            return {...state, user: action.payload.user}
        case "SET-USER-DIGEST-RECEPTION-TIME":
            return {...state, user: {...state.user, digestReceptionTime: action.payload.digestReceptionTime}}
        case "SET-USER-CHANNELS":
            return {...state, channels: action.payload.channels}
        case "ADD-USER-CHANNEL":
            return {...state, channels: [...state.channels, action.payload.channel]}
        case "DELETE-USER-CHANNEL":
            return {...state, channels: state.channels.filter(item => item.id !== action.payload.id)}
        default:
            return state
    }
}

export const setUserAC = (user: UserType) => {
    return {type: "SET-USER", payload: {user}} as const
}

export const setUserDigestReceptionTimeAC = (digestReceptionTime: string) => {
    return {type: "SET-USER-DIGEST-RECEPTION-TIME", payload: {digestReceptionTime}} as const
}

export const setUserChannelsAC = (channels: ChannelType[]) => {
    return {type: "SET-USER-CHANNELS", payload: {channels}} as const
}

export const addUserChannelAC = (channel: ChannelType) => {
    return {type: "ADD-USER-CHANNEL", payload: {channel}} as const
}

export const deleteUserChannelAC = (id: string) => {
    return {type: "DELETE-USER-CHANNEL", payload: {id}} as const
}

type SetUserActionType = ReturnType<typeof setUserAC>

type SetUserDigestReceptionTimeActionType = ReturnType<typeof setUserDigestReceptionTimeAC>

type SetUserChannelsActionType = ReturnType<typeof setUserChannelsAC>

type AddUserChannelActionType = ReturnType<typeof addUserChannelAC>

type DeleteUserChannelActionType = ReturnType<typeof deleteUserChannelAC>

type UserActionType = SetUserActionType
    | SetUserDigestReceptionTimeActionType
    | SetUserChannelsActionType
    | AddUserChannelActionType
    | DeleteUserChannelActionType