import { createContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'
import { AppState } from './Types'

export type ContextProps = {
    myState: AppState,
    addToFavourites: (id:string) => void,
    formatDate: (date:string) => string
}

const INITIAL_STATE: AppState = {
    favourites:  JSON.parse(localStorage.getItem('akular_favourites')!) || [] ,
}

const MONTHS:string[] = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUN',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
]

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

    /**
     * FORMAT DATE
     * @param date 
     * @returns month day, year string
     */
     const formatDate = (date:string):string => {
        const d = new Date(date);
        const month = MONTHS[d.getMonth()]
        const day = d.getDay() + 1
        const year = d.getFullYear()
  
        return `${month} ${day}, ${year}`;
      }

    return (<GlobalContext.Provider value={{
       myState,
       addToFavourites,
       formatDate
    }}>
    {children}
</GlobalContext.Provider>)
}