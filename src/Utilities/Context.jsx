import { useState, createContext, useMemo, useCallback } from "react";
import themesManager from "./themes";
import PropTypes from 'prop-types';

export const Context = createContext();


const ContextProvider = (props) => {
    const [state, setState] = useState({ currentTheme: 'light' });

    const setCurrentTheme = useCallback((theme) => {
            setState({ ...state, currentTheme: theme })
    }, [state]);

    const themeColors = themesManager(state.currentTheme);

    const value = useMemo(() => {
            return {
                state,
                setCurrentTheme,
                themeColors,
            }
        }, [setCurrentTheme, state, themeColors]
    )

    return <Context.Provider value={value}> {props.children} </Context.Provider>
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ContextProvider