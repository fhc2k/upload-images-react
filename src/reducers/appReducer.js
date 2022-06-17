import { TYPES } from "../actions/appActions"

export const initialState = {
    data: [],
    isLoading: true,
    state: "upload",
    url: null
} 

export const appReducer = (state, action) => {
    switch (action.type) {
        case TYPES.SET_DATA:
            return { ...state, data: action.payload, isLoading: false }
        case TYPES.UPLOADING: 
            return { ...state, state: "uploading" };
        case TYPES.DONE: 
            return { ...state, state: "done", url: action.payload };
        case TYPES.RESET: 
            return { state: "upload", url: null };
        default:
            return state;
    }
}