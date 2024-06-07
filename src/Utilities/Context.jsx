import { useState, createContext, useMemo, useCallback } from "react";
import themesManager from "./themes";
import PropTypes from 'prop-types';
import getInputData from "./getInputData";

export const Context = createContext();

const ContextProvider = (props) => {
    const [state, setState] = useState({ currentTheme: 'light', inputData: null });

    const setCurrentTheme = useCallback((theme) => {
            setState({ ...state, currentTheme: theme })
    }, [state]);

    const themeColors = themesManager(state.currentTheme);

    const getData = useCallback((inputValue, inputCurrency) => {
        const data = getInputData(inputValue, inputCurrency);
        setState({ ...state, inputData: data });
    }, [state]);

    const value = useMemo(() => {
            return {
                state,
                setCurrentTheme,
                themeColors,
                getData,
            }
        }, [setCurrentTheme, state, themeColors, getData]
    );

    return <Context.Provider value={value}> {props.children} </Context.Provider>
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ContextProvider