import { useState, useEffect, useContext } from "react";
import { Context } from "./Utilities/Context";
import DropdownMenu from "./DropdownMenu";
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

    const [showBurgerClass, setShowBurgerClass] = useState('');
    const [showNavItems, setShowNavItems] = useState('');
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [animateIcon, setAnimateIcon] = useState(false);
    const [dropDownMenuActive, setDropDownMenuActive] = useState(false);

    const [animation, setAnimation] = useState('');
    const [lineWidth, setLineWidth] = useState({
        line1: 'M4 8 l20 0',
        line2: 'M4 15 l20 0',
        line3: 'M4 22 l20 0'
    });

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

        setDropDownMenuActive(false);
        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize);
        }

    }, [screenSize.width]);


    function showDropDownMenu() {

        if (dropDownMenuActive === false) {

            setDropDownMenuActive(true);
            setAnimation('slideIn')

        } else if (dropDownMenuActive === true) {

            setAnimation('slideOut');
            setTimeout(() => {
                setDropDownMenuActive(false);
            }, 80);

        }

    }

    function burgerAnimate(val) {

        if (val === true) {
            setLineWidth({
                line1: 'M4 8 l10 0',
                line2: 'M4 15 l16 0',
                line3: 'M4 22 l10 0'
            });
        } else if (val === false) {
            setLineWidth({
                line1: 'M4 8 l20 0',
                line2: 'M4 15 l20 0',
                line3: 'M4 22 l20 0'
            });
        }

    }


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
                <div className="relative w-1/2 flex justify-end items-center">
                    <a href="#" className={`burger-menu md:hidden order-4 ml-4 scale-75 ${themeColors.navbar.burger_hover} transition-all duration-200 ${showBurgerClass}`} onClick={showDropDownMenu}>
                        <svg className={`burger-lines ${themeColors.navbar.burger}`} height='30' width='28' onMouseEnter={() => burgerAnimate(true)} onMouseLeave={() => burgerAnimate(false)}>
                            <g fill="none">
                                <path className="transition-all duration-200 ease-in-out" stroke="" d={lineWidth.line1} strokeWidth={2} strokeLinecap='round' />
                                <path className="transition-all duration-200 ease-in-out" stroke="" d={lineWidth.line2} strokeWidth={2} strokeLinecap='round' />
                                <path className="transition-all duration-200 ease-in-out" stroke="" d={lineWidth.line3} strokeWidth={2} strokeLinecap='round' />
                            </g>
                        </svg>
                    </a>
                    {
                        dropDownMenuActive && <DropdownMenu animate={animation} />
                    }
                    <ul className={`md:inline-block hidden ${showNavItems}`}>
                        <li>
                            <div className={`ml-8 font-questrial ${themeColors.text}`}>
                                <button className={`${themeColors.button.default} ${themeColors.button.hover} ${themeColors.button.active} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}>
                                    <a href="mailto:fab.louis.971@gmail.com" target="blank">Get in touch</a>
                                </button>
                            </div>
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