import {ChannelType} from "../components/channel/Channel";
import {UserType} from "../api/api";
import {tg} from "../globalTheme";

export type UserStateType = {
    user: UserType
    channels: ChannelType[],
}

const initialState: UserStateType = {
    user: {
        id: "",
        telegramId: tg.initDataUnsafe.user!.id,
        createdAt: "",
        digestReceptionTime: "",
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


type SetUserActionType = ReturnType<typeof setUserAC>

type SetUserDigestReceptionTimeActionType = ReturnType<typeof setUserDigestReceptionTimeAC>

type SetUserChannelsActionType = ReturnType<typeof setUserChannelsAC>

type AddUserChannelActionType = ReturnType<typeof addUserChannelAC>


type UserActionType = SetUserActionType
    | SetUserDigestReceptionTimeActionType
    | SetUserChannelsActionType
    | AddUserChannelActionType