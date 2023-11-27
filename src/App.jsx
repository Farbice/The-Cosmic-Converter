// import { useState} from 'react';
// import Intro from './Intro.jsx';
// import Count from './Count.jsx';
// import ConverterLegacy from './ConverterLegacy.jsx';
// import ConverterInit from './ConverterInit.jsx';
import { useState, createContext, useContext } from "react";
import Converter from './Converter.jsx';
import Navbar from "./Navbar";
import ContextProvider from "./Utilities/Context";

export const UserTheme = createContext(null);

function App() {

  return <>

    <ContextProvider>
        
        {/* <Intro /> */}
        {/* <Count /> */}
        {/* <ConverterLegacy /> */}
        {/* <ConverterInit /> */}

        <Navbar />
        <Converter />
    </ContextProvider>

  </>
}

export default App
