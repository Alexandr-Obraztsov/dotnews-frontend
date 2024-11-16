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
