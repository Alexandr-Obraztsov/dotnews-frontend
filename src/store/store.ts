import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./userReducer";


const RootReducer = combineReducers({
    user: userReducer,
})

export const store = configureStore({
    reducer: RootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof RootReducer>