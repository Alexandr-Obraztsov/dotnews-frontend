import {SubscribesType} from "../components/pages/profile/Profile";
const initialState : SubscribesType = {topics: [], channels: []}

export const  subscribesReducer = (state: SubscribesType = initialState, action: ActionType) : SubscribesType => {
    switch (action.type){
        case "UPDATE-ITEMS":

        default:
            return state
    }
}



const updateItemsAC = (subscribes: SubscribesType) => ({type: "UPDATE-ITEMS", payload: {subscribes}})

type UpdateItemsActionType = ReturnType<typeof updateItemsAC>

type ActionType = UpdateItemsActionType