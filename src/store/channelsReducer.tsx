import {ChannelType} from "../components/common/channel/Channel";
import {tg} from "../globalTheme";
import {DigestType} from "../components/common/digest/Digest";
import {addUserDigestAC} from "./userReducer";

export type ChannelsStateType = {
    [key: string]: ChannelType[]
}

const initialState: ChannelsStateType = {}

export const channelsReducer = (state = initialState, action: ChannelsActionType): ChannelsStateType => {
    switch (action.type) {
        case "SET-DIGEST-CHANNELS":
            return {...state, [action.payload.digestId]: action.payload.channels}
        case "ADD-USER-DIGEST":
            return {...state, [action.payload.digest.id]: []}
        case "ADD-DIGEST-CHANNEL":
            return {...state, [action.payload.digestId]: [...state[action.payload.digestId], action.payload.channel]}
        case "DELETE-DIGEST-CHANNEL":
            return {
                ...state,
                [action.payload.digestId]: state[action.payload.digestId].filter(item => item.id !== action.payload.channel.id)
            }
        default:
            return state
    }
}

export const setDigestChannelsAC = (payload: { digestId: string, channels: ChannelType[] }) => {
    return {type: "SET-DIGEST-CHANNELS", payload} as const
}

export const addDigestChannelAC = (payload: { digestId: string, channel: ChannelType }) => {
    return {type: "ADD-DIGEST-CHANNEL", payload} as const
}

export const deleteDigestChannelAC = (payload: { digestId: string, channel: ChannelType }) => {
    return {type: "DELETE-DIGEST-CHANNEL", payload} as const
}


type SetDigestChannelsActionType = ReturnType<typeof setDigestChannelsAC>

type AddDigestChannelActionType = ReturnType<typeof addDigestChannelAC>

type DeleteDigestChannelActionType = ReturnType<typeof deleteDigestChannelAC>

type AddUserDigestActionType = ReturnType<typeof addUserDigestAC>

type ChannelsActionType = SetDigestChannelsActionType
    | AddDigestChannelActionType
    | DeleteDigestChannelActionType
    | AddUserDigestActionType