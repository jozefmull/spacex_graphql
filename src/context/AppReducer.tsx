import { AppState } from "./Types";

type AppAction = 
    | {type: 'ADD_TO_FAVOURITES', payload:string}
    | {type: 'REMOVE_FROM_FAVOURITES', payload:string}

// Reducer is how we specify application state changes in response to certain actions to our context
export const AppReducer = (state:AppState, action:AppAction):AppState => {
    switch (action.type) {
        case 'ADD_TO_FAVOURITES':
            localStorage.setItem('akular_favourites', JSON.stringify([...state.favourites, action.payload]))

            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        case 'REMOVE_FROM_FAVOURITES':
            localStorage.setItem('akular_favourites', JSON.stringify(state.favourites.filter(item => item !== action.payload)))

            return {
                ...state,
                favourites: state.favourites.filter(item => item !== action.payload)
            }
        default:
            return state;
    }
}