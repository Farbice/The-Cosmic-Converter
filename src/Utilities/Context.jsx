import { useState, createContext, useMemo, useCallback } from "react"

export const Context = createContext();


const ContextProvider = (props) => {
    const [state, setState] = useState({ currentTheme: 'dark' });

    const setCurrentTheme = useCallback((theme) => {
            setState({ ...state, currentTheme: theme })
      }, [state]);

    const value = useMemo(() => {
        return {
            state,
            setCurrentTheme,
        }
    }, [setCurrentTheme, state]
    )
    return <Context.Provider value={value}> {props.children} </Context.Provider>

}

export default ContextProvider