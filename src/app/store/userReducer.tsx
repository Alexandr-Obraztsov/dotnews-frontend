import { NavigateFunction } from 'react-router-dom'
import { Dispatch } from 'redux'
import { userTG } from '../../utils/tg'
import { api } from '../api/api'
import { PATHS } from '../PATHS'
import { getDigestsTC } from './digestsReducer'

const initialState: UserType = {
	id: '',
	telegramId: 0,
	createdAt: '',
	digestsUpdatedAt: '',
	imageUrl: '',
}

export type UserType = {
	id: string
	telegramId: number
	createdAt: string
	imageUrl: string
	digestsUpdatedAt: string
}

export const userReducer = (
	state: UserType = initialState,
	action: UserAT
): UserType => {
	switch (action.type) {
		case 'SET-USER':
			return { ...action.payload.user }
		default:
			return state
	}
}

export const setUserAC = (user: UserType) => {
	return { type: 'SET-USER', payload: { user } } as const
}

export type SetUserAT = ReturnType<typeof setUserAC>

type UserAT = ReturnType<typeof setUserAC>

export const getUserTC =
	(navigate: NavigateFunction) => (dispatch: Dispatch<any>) => {
		api
			.getUser(userTG!.id)
			.then(user => {
				dispatch(setUserAC(user))
				dispatch(getDigestsTC())
			})
			.then(res => navigate(PATHS.profilePage))
			.catch(er => navigate(PATHS.welcomePage))
	}
