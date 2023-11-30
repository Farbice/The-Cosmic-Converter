import PropTypes from 'prop-types';
import { useState, createContext, useMemo, useCallback } from "react"

export const Context = createContext();


const ContextProvider = (props) => {
    const [state, setState] = useState({ currentTheme: 'light' });

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

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ContextProvider