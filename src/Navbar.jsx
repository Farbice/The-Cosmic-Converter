import { useState, useEffect, useContext } from "react";
import { Context } from "./Utilities/Context";
import LogoDark from "./Assets/Logo/logoDark";
import LogoLight from "./Assets/Logo/logoLight";
import LogotypeLight from "./Assets/Logo/logotypeLight";
import LogotypeDark from "./Assets/Logo/logotypeDark";
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

    const [showBurgerClass, setShowBurgerClass] = useState('inactive');
    const [showNavItems, setShowNavItems] = useState('active');
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [animateIcon, setAnimateIcon] = useState(false);

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
            className={`navbar flex p-4 w-full` + " " + `${themeColors.nav_bg}` + " " + 'transition-all duration-200 ease-in-out'}>
            <div className="flex md:w-3/4 xs:w-5/6 w-11/12 m-auto items-center">
                <div className="logo w-1/2">
                    <div className="md:block hidden">
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
                    <div className="md:hidden">
                        <a href="">
                            {
                                (currentTheme === 'light') &&
                                <LogoDark />
                            }
                            {
                                (currentTheme === 'dark') &&
                                <LogoLight />
                            }
                        </a>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <a href="#" className={`burger-menu order-4 ml-4 scale-75 ${themeColors.navbar.burger_hover} transition-all duration-200 ${showBurgerClass}`}>
                        <svg className={`burger-lines ${themeColors.navbar.burger}`} height='30' width='28'>
                            <g fill="none">
                                <path stroke="" d='M4 8 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="" d='M4 15 l20 0' strokeWidth={2} strokeLinecap='round' />
                                <path stroke="" d='M4 22 l20 0' strokeWidth={2} strokeLinecap='round' />
                            </g>
                        </svg>
                    </a>
                    <ul className={"nav-list" + ` ${showNavItems}`}>
                        <li>
                            <a href="#" className={`ml-8 font-questrial ${themeColors.text}`}>
                                <button className={`${themeColors.button.default} ${themeColors.button.hover} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}>
                                    <a href="mailto:fab.louis.971@gmail.com" target="blank">Get in touch</a>
                                </button>
                            </a>
                        </li>
                    </ul>
                    <div
                        data-name="dark-mode--icon"
                        className={"theme-icon ml-8 p-3 rounded-full scale-75 cursor-pointer ring-2 ring-orange-300" + " " + `${themeColors.icon.hover}` + " " + `${themeColors.icon.active}` + " " + `${animateIcon && "ring-2 ring-inset" + " " + `${themeColors.icon.ring}` + " " + `${themeColors.animate_settings.button}`}`}

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