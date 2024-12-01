import { PATHS } from 'app/PATHS'
import { NavigateFunction } from 'react-router-dom'
import { Dispatch } from 'redux'
import { userTG } from 'utils/tg'
import { api } from '../api/api'
import { getChannels } from './channelsReducer'
import { AppStateType } from './store'

export type DigestType = {
	id: string
	name: string
	emoji: string
	createdAt: string
	channelsUpdatedAt: string
	timeInterval: string
	nextAt: string
	receptionTime: string
	userId: string
}

export const digestsReducer = (
	state: DigestType[] = [],
	action: DigestsAT
): DigestType[] => {
	switch (action.type) {
		case 'SET-DIGESTS':
			return [...action.payload.digests]
		case 'ADD-DIGEST':
			return [...state, action.payload.digest]
		case 'UPDATE-DIGEST':
			return [
				...state.map(item =>
					item.id === action.payload.digest.id
						? {
								...action.payload.digest,
						  }
						: item
				),
			]
		case 'DELETE-DIGEST':
			return [...state.filter(item => item.id !== action.payload.id)]
		default:
			return state
	}
}

export const setDigestsAC = (digests: DigestType[]) => {
	return { type: 'SET-DIGESTS', payload: { digests } } as const
}

export const addDigestAC = (digest: DigestType) => {
	return { type: 'ADD-DIGEST', payload: { digest } } as const
}

export const updateDigestAC = (digest: DigestType) => {
	return { type: 'UPDATE-DIGEST', payload: { digest } } as const
}

export const deleteDigestAC = (id: string) => {
	return { type: 'DELETE-DIGEST', payload: { id } } as const
}

export type SetDigestsAT = ReturnType<typeof setDigestsAC>

export type AddDigestAT = ReturnType<typeof addDigestAC>

export type UpdateDigestAT = ReturnType<typeof updateDigestAC>

export type DeleteDigestAT = ReturnType<typeof deleteDigestAC>

type DigestsAT = AddDigestAT | SetDigestsAT | UpdateDigestAT | DeleteDigestAT

export const getDigestsTC = () => (dispatch: Dispatch<any>) => {
	api.getDigests(userTG!.id).then(digests => {
		dispatch(setDigestsAC(digests))
		digests.forEach(digest => dispatch(getChannels(digest.id)))
	})
}

export const addDigestTC =
	(navigate: NavigateFunction) =>
	(dispatch: Dispatch<DigestsAT>, getState: () => AppStateType) => {
		const digests = getState().digests
		let digest_num = 1
		while (digests.map(dg => dg.name).includes(`Новый Дайджест ${digest_num}`))
			digest_num++
		api
			.createDigest(userTG!.id, {
				name: `Новый Дайджест ${digest_num}`,
				timeInterval: '1.00:00:00',
				receptionTime: '09:00:00',
				emoji: 'f09f928c',
			})
			.then(digest => {
				navigate(PATHS.digestPage.replace(':digestId', digest.id))
				dispatch(addDigestAC(digest))
			})
	}

export const deleteDigestTC =
	(digestId: string) => (dispatch: Dispatch<any>) => {
		api.deleteUserDigest({ userTelegramId: userTG!.id, digestId: digestId })
		dispatch(deleteDigestAC(digestId))
	}

export const updateDigestTC =
	(digest: DigestType) => (dispatch: Dispatch<any>) => {
		api.updateDigest(userTG!.id, digest)
		dispatch(updateDigestAC(digest))
	}
