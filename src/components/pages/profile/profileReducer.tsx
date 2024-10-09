import {ItemType} from "../../topicsList/item/Item";


export type ProfileStateType = {
    openPopup: boolean
    error: Error | null
    isLoading: boolean
    items: ItemType[]
}

type ProfileActionType = {
    type: "SET_OPEN_POPUP" | "SET_ERROR" | "SET_LOADING" | "SET_ITEMS",
    payload: boolean | Error | ItemType[]
}

export const profileReducer = (state: ProfileStateType, action: ProfileActionType): ProfileStateType => {
    switch (action.type) {
        case "SET_OPEN_POPUP":
            return {...state, openPopup: action.payload as boolean}
        case "SET_ERROR":
            return {...state, error: action.payload as Error}
        case "SET_LOADING":
            return {...state, isLoading: action.payload as boolean}
        case "SET_ITEMS":
            return {...state, items: action.payload as ItemType[]}
        default:
            throw new Error("Unknown action type")
    }
}

export const setOpenPopupAC = (payload: boolean) : ProfileActionType => ({type: "SET_OPEN_POPUP", payload})

export const setErrorAC = (payload: Error) : ProfileActionType => ({type: "SET_ERROR", payload})

export const setLoadingAC = (payload: boolean) : ProfileActionType => ({type: "SET_LOADING", payload})

export const setItemsAC = (payload: ItemType[]) : ProfileActionType => ({type: "SET_ITEMS", payload})
