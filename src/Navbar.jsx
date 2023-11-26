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

    }, [screenSize.width]);


    return (
        <nav className="navbar flex md:h-24 w-full">
            <div className="flex md:w-3/4 md:m-auto items-center w-full mx-10 my-8">
                <div className="logo w-1/2">
                    <a href="">
                        <Logotype />
                    </a>
                </div>
                <div className="w-1/2 flex justify-end">
                    <a href="#" className="burger-menu">
                        <svg className={"burger-lines" + ` ${showBurgerClass}`} height='30' width='28'>
                            <g fill="none">
                                <path stroke="#fff" d='M4 8 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="#fff" d='M4 15 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="#fff" d='M4 22 l20 0' strokeWidth={2} strokeLinecap='round' />
                            </g>
                        </svg>
                    </a>
                    <ul className={"nav-list" + ` ${showNavItems}`}>
                        <li><a href="#" className="font-karla-semibold">Favorites</a></li>
                        <li className="ml-8 font-karla-semibold"><a href="#">Connect</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;