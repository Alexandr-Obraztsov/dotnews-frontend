import {ItemType} from "../../ItemsList/item/Item";


export type ProfileStateType = {
    error: Error | null
    isLoading: boolean
    topics: ItemType[]
}

type ProfileActionType = {
    type: "SET_OPEN_POPUP" | "SET_ERROR" | "SET_LOADING" | "SET_TOPICS",
    payload: boolean | Error | ItemType[]
}

export const profileReducer = (state: ProfileStateType, action: ProfileActionType): ProfileStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {...state, error: action.payload as Error}
        case "SET_LOADING":
            return {...state, isLoading: action.payload as boolean}
        case "SET_TOPICS":
            return {...state, topics: action.payload as ItemType[]}
        default:
            throw new Error("Unknown action type")
    }
}


export const setErrorAC = (payload: Error) : ProfileActionType => ({type: "SET_ERROR", payload})

export const setLoadingAC = (payload: boolean) : ProfileActionType => ({type: "SET_LOADING", payload})

export const setTopicsAC = (payload: ItemType[]) : ProfileActionType => ({type: "SET_TOPICS", payload})
