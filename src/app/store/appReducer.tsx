type AppStateStateType = 'loading' | 'idle' | 'error'

type AppStateType = {
	state: AppStateStateType
	error?: Error
}

export const appReducer = (state: AppStateType, action: AppAT) => {
	switch (action.type) {
		case 'SET-APP-STATE':
			return action.payload
		default:
			return state
	}
}

export const setAppStateAC = (state?: AppStateStateType, error: string = '') =>
	({
		type: 'SET-APP-STATE',
		payload: { state, error },
	} as const)

type AppAT = ReturnType<typeof setAppStateAC>
