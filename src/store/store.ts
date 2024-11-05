import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./userReducer";
import {channelsReducer} from "./channelsReducer";


const RootReducer = combineReducers({
    user: userReducer,
    channels: channelsReducer
})

export const store = configureStore({
    reducer: RootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof RootReducer>