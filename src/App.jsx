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
        <div className={`xs:min-h-screen ${themeColors.bckgd_secondary}`}>
            <Navbar />
            <Converter />
        </div>
    )

}

export default App