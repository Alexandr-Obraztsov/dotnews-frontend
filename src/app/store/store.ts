import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { channelsReducer } from './channelsReducer'
import { digestsReducer } from './digestsReducer'
import { userReducer } from './userReducer'

const RootReducer = combineReducers({
	user: userReducer,
	digests: digestsReducer,
	channels: channelsReducer,
})

export const store = configureStore({
	reducer: RootReducer,
})

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof RootReducer>
