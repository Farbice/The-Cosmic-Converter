// import { useState} from 'react';
// import Intro from './Intro.jsx';
// import Count from './Count.jsx';
// import ConverterLegacy from './ConverterLegacy.jsx';
// import ConverterInit from './ConverterInit.jsx';
import { createContext, useContext } from "react";
import { Context } from "./Utilities/Context";
import Converter from './Converter.jsx';
import Navbar from "./Navbar";


export const UserTheme = createContext(null);

function App() {

    const {state: {currentTheme}} = useContext(Context);
    //console.log('state : ', {state: {currentTheme}, setCurrentTheme});

    return <>
        <div className={`h-screen ${(currentTheme === 'light' ? 'bg-slate-200' : 'bg-slate-800') } `}>
            {
                //console.log('state : ', currentTheme)
            }
            {/* <UserTheme.Provider value="flatDesign"> */}

                {/* <Intro /> */}
                {/* <Count /> */}
                {/* <ConverterLegacy /> */}
                {/* <ConverterInit /> */}
                <Navbar />
                <Converter />

            {/* </UserTheme.Provider> */}
        </div>
    </>
}

export default App
