import { DigestType } from '../components/common/digest/Digest'
import { tg } from '../globalTheme'

export type UserStateType = {
	user: UserType
	digests: DigestType[]
}

export type UserType = {
	id: string
	telegramId: number
	createdAt: string
	imageUrl: string
	digestsUpdatedAt: string
}

const initialState: UserStateType = {
	user: {
		id: '',
		telegramId: tg.initDataUnsafe.user!.id,
		createdAt: '',
		digestsUpdatedAt: '',
		imageUrl: '',
	},
	digests: [],
}

export const userReducer = (
	state: UserStateType = initialState,
	action: UserActionType
): UserStateType => {
	switch (action.type) {
		case 'SET-USER':
			return { ...state, user: action.payload.user }
		case 'SET-USER-DIGESTS':
			return { ...state, digests: action.payload.digests }
		case 'ADD-USER-DIGEST':
			return { ...state, digests: [...state.digests, action.payload.digest] }
		case 'UPDATE-USER-DIGEST-NAME':
			return {
				...state,
				digests: state.digests.map(item =>
					item.id === action.payload.digest.id
						? {
								...item,
								name: action.payload.name,
						  }
						: item
				),
			}
		case 'UPDATE-USER-DIGEST-RECEPTION-TIME':
			return {
				...state,
				digests: state.digests.map(item =>
					item.id === action.payload.digestId
						? {
								...item,
								receptionTime: action.payload.receptionTime,
						  }
						: item
				),
			}
		case 'UPDATE-USER-DIGEST-TIME-INTERVAL':
			return {
				...state,
				digests: state.digests.map(item =>
					item.id === action.payload.digestId
						? {
								...item,
								timeInterval: action.payload.timeInterval,
						  }
						: item
				),
			}
		case 'DELETE-USER-DIGEST':
			return {
				...state,
				digests: state.digests.filter(item => item.id !== action.payload.id),
			}
		default:
			return state
	}
}

export const setUserAC = (user: UserType) => {
	return { type: 'SET-USER', payload: { user } } as const
}

export const setUserDigestsAC = (digests: DigestType[]) => {
	return { type: 'SET-USER-DIGESTS', payload: { digests } } as const
}

export const addUserDigestAC = (digest: DigestType) => {
	return { type: 'ADD-USER-DIGEST', payload: { digest } } as const
}

export const updateUserDigestNameAC = (payload: {
	digest: DigestType
	name: string
}) => {
	return { type: 'UPDATE-USER-DIGEST-NAME', payload } as const
}

export const updateUserDigestReceptionTimeAC = (payload: {
	receptionTime: string
	digestId: string
}) => {
	return { type: 'UPDATE-USER-DIGEST-RECEPTION-TIME', payload } as const
}

export const updateUserDigestTimeIntervalAC = (payload: {
	timeInterval: string
	digestId: string
}) => {
	return { type: 'UPDATE-USER-DIGEST-TIME-INTERVAL', payload } as const
}

export const deleteUserDigestAC = (id: string) => {
	return { type: 'DELETE-USER-DIGEST', payload: { id } } as const
}

export type SetUserActionType = ReturnType<typeof setUserAC>

export type SetUserDigestsActionType = ReturnType<typeof setUserDigestsAC>

export type AddUserDigestActionType = ReturnType<typeof addUserDigestAC>

export type UpdateUserDigestNameActionType = ReturnType<
	typeof updateUserDigestNameAC
>

export type DeleteUserDigestActionType = ReturnType<typeof deleteUserDigestAC>

export type UpdateUserDigestReceptionTimeActionType = ReturnType<
	typeof updateUserDigestReceptionTimeAC
>

export type UpdateUserDigestTimeIntervalActionType = ReturnType<
	typeof updateUserDigestTimeIntervalAC
>

type UserActionType =
	| SetUserActionType
	| SetUserDigestsActionType
	| AddUserDigestActionType
	| UpdateUserDigestNameActionType
	| DeleteUserDigestActionType
	| UpdateUserDigestReceptionTimeActionType
	| UpdateUserDigestTimeIntervalActionType
