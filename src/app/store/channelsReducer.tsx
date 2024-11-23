import { Dispatch } from 'redux'
import { userTG } from '../../utils/tg'
import { api } from '../api/api'
import { AddDigestAT, SetDigestsAT } from './digestsReducer'

type ChannelsStateType = {
	[key: string]: ChannelType[]
}

export type ChannelType = {
	id: string
	telegramName: string
	title: string
	telegramId: number | null
	createdAt: string
	lastMessageId: string
	imageUrl: string
}

export const channelsReducer = (
	state: ChannelsStateType = {},
	action: ChannelsAT
): ChannelsStateType => {
	switch (action.type) {
		case 'SET-CHANNELS':
			return { ...state, [action.payload.digestId]: action.payload.channels }
		case 'ADD-CHANNEL':
			return {
				...state,
				[action.payload.digestId]: [
					...state[action.payload.digestId],
					action.payload.channel,
				],
			}
		case 'DELETE-CHANNEL':
			return {
				...state,
				[action.payload.digestId]: state[action.payload.digestId].filter(
					item => item.id !== action.payload.channel.id
				),
			}
		case 'ADD-DIGEST':
			return { ...state, [action.payload.digest.id]: [] }
		case 'SET-DIGESTS':
			state = {}
			action.payload.digests.forEach(digest => (state[digest.id] = []))
			return state
		default:
			return state
	}
}

export const setChannelsAC = (payload: {
	digestId: string
	channels: ChannelType[]
}) => {
	return { type: 'SET-CHANNELS', payload } as const
}

export const addChannelAC = (payload: {
	digestId: string
	channel: ChannelType
}) => {
	return { type: 'ADD-CHANNEL', payload } as const
}

export const deleteChannelAC = (payload: {
	digestId: string
	channel: ChannelType
}) => {
	return { type: 'DELETE-CHANNEL', payload } as const
}

export type SetChannelsAT = ReturnType<typeof setChannelsAC>

export type AddChannelAT = ReturnType<typeof addChannelAC>

export type DeleteChannelAT = ReturnType<typeof deleteChannelAC>

type ChannelsAT =
	| SetChannelsAT
	| AddChannelAT
	| DeleteChannelAT
	| AddDigestAT
	| SetDigestsAT

export const getChannels =
	(digestId: string) => (dispatch: Dispatch<ChannelsAT>) => {
		api
			.getDigestChannels(userTG!.id, digestId)
			.then(channels => dispatch(setChannelsAC({ digestId, channels })))
	}
