import { useState, useEffect, useContext } from "react";
import LogotypeLight from "./Assets/Logo/logotypeLight";
import LogotypeDark from "./Assets/Logo/logotypeDark";
import { Context } from "./Utilities/Context";
import Moon from "./Assets/Images/moon";
import Sun from "./Assets/Images/sun";


function getCurrentDimension() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}


function Navbar() {

    const { state: { currentTheme }, setCurrentTheme } = useContext(Context);
    const { themeColors } = useContext(Context);

    console.log(themeColors.test);

    const [showBurgerClass, setShowBurgerClass] = useState('inactive');
    const [showNavItems, setShowNavItems] = useState('active');
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [animateIcon, setAnimateIcon] = useState(false);

    console.log('animateIcon ', animateIcon);


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
        <nav
            data-name="navbar--component"
            className={`navbar flex md:h-24 w-full` + " " + `${themeColors.nav_bg}` + " " + 'transition-all duration-200 ease-in-out'}>
            <div className="flex md:w-3/4 md:m-auto items-center w-full mx-10 my-8">
                <div className="logo w-1/2">
                    <a href="">
                        {
                            (currentTheme === 'light') &&
                            <LogotypeDark />
                        }
                        {
                            (currentTheme === 'dark') &&
                            <LogotypeLight />
                        }
                    </a>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <a href="#" className={"burger-menu order-4 ml-8 hover:bg-slate-300 transition-all duration-200" + ` ${showBurgerClass}`}>
                        <svg className="burger-lines stroke-sky-900" height='30' width='28'>
                            <g fill="none">
                                <path stroke="" d='M4 8 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="" d='M4 15 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="" d='M4 22 l20 0' strokeWidth={2} strokeLinecap='round' />
                            </g>
                        </svg>
                    </a>
                    <ul className={"nav-list" + ` ${showNavItems}`}>
                        <li>
                            <a href="#" className={`font-karla-semibold ${themeColors.nav_text}`}>Favorites</a>
                        </li>
                        <li className={`ml-8 font-karla-semibold ${themeColors.nav_text}`}>
                            <a href="#">Connect</a>
                        </li>
                    </ul>
                    <div
                        data-name="dark-mode--icon"
                        className={"theme-icon ml-8 p-3 rounded-full scale-75 cursor-pointer ring-inset" + " " + `hover:${themeColors.icon.hover}` + " " + `active:${themeColors.icon.active}` + " " + `${currentTheme === 'light' ? `${animateIcon && "ring-1 ring-slate-500 transition-all duration-200 ease-in"}` : `${animateIcon && "ring-1 ring-slate-600 transition-all duration-200 ease-out"}`}`}

                        onClick={() => {
                            setAnimateIcon(true);
                            setTimeout(() => {
                                setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
                                setAnimateIcon(false);
                            }, 300);
                        }}>
                        {
                            (currentTheme === 'light') ? <Moon /> : <Sun />
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}


export default Navbar;