import { createContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'
import { AppState } from './Types'

export type ContextProps = {
    myState: AppState,
    addToFavourites: (id:string) => void
}

const INITIAL_STATE: AppState = {
    favourites:  JSON.parse(localStorage.getItem('akular_favourites')!) || [] ,
}

export const GlobalContext = createContext({} as ContextProps)

type Props = {
    children: JSX.Element | JSX.Element[]
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
    const [myState, dispatch] = useReducer(AppReducer, INITIAL_STATE);

    /**
     * ADD TO FAVOURITES
     * @param id 
     */
    const addToFavourites = (id:string):void => {
        if (myState.favourites.find(item => item === id)) {
            dispatch({type:'REMOVE_FROM_FAVOURITES', payload: id})
        }else{
            dispatch({type:'ADD_TO_FAVOURITES', payload: id})
        }
    }

    return (<GlobalContext.Provider value={{
       myState,
       addToFavourites
    }}>
    {children}
</GlobalContext.Provider>)
}