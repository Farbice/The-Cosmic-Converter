import { createContext, useContext } from "react";
import { Context } from "./Utilities/Context";
import Converter from './Converter.jsx';
import Navbar from "./Navbar";

export const UserTheme = createContext(null);

function App() {

    const { state: { currentTheme } } = useContext(Context);
    const { themeColors } = useContext(Context);
    { currentTheme }

    return (
        <div className={`h-screen transition-all duration-1000 ease-in-out ${themeColors.bckgd}`}>
            <Navbar />
            <Converter />
        </div>
    )

}

export default App