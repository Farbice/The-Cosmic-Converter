import { useEffect } from "react";
import { useState } from "react";
import Logotype from "./Assets/Logo/logotype";

function getCurrentDimension() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}


function Navbar() {


    const [showBurgerClass, setShowBurgerClass] = useState('inactive');
    const [showNavItems, setShowNavItems] = useState('active');
    const [screenSize, setScreenSize] = useState(getCurrentDimension());


    useEffect(() => {

        function handleScreenSize() {
            const newSize = getCurrentDimension();
            setScreenSize(newSize);

            if (newSize.width > 768) {
                setShowBurgerClass('inactive');
                setShowNavItems('active');
            } else {
                setShowBurgerClass('active');
                setShowNavItems('inactive');
            }
        }

        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize);
        }

    }, [screenSize.width])


    return (
        <nav className="navbar flex md:h-24 w-full">
            <div className="flex md:w-3/4 md:m-auto items-center w-full mx-10 my-8">
                <div className="logo w-1/2">
                    <Logotype />
                </div>
                <div className="w-1/2 flex justify-end">
                    <svg className={"burger-line" + ` ${showBurgerClass}`} viewBox='0 0 10 8' width='35'>
                        <path d='M1 1h8M1 4h 8M1 7h8'
                            stroke='#fff'
                            strokeWidth={1}
                            strokeLinecap='round' />
                    </svg>
                    <ul className={"nav-list" + ` ${showNavItems}`}>
                        <li><a href="#">Favorites</a></li>
                        <li className="ml-8"><a href="#">Connect</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;