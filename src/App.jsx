import { createContext, useContext } from "react";
import { Context } from "./Utilities/Context";
import Converter from './Converter.jsx';
import Navbar from "./Navbar";

export const UserTheme = createContext(null);

function App() {

    const {state: {currentTheme}} = useContext(Context);

    return (
        <div className={`h-screen transition-all duration-1000 ease-in-out ${(currentTheme === 'light' ? 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500' : 'bg-gradient-to-br from-blue-900 via-blue-900 to-gray-900')} `}>
                <Navbar />
                <Converter />
        </div>
    )
    
}

export default App