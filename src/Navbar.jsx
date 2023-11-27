import { useState, useEffect, useContext } from "react";
import Logotype from "./Assets/Logo/logotype";
import themesManager from "./Utilities/themes";
import {UserTheme} from "./App";
import {Context} from "./Utilities/Context";


function getCurrentDimension() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}


function Navbar (){

    const {state: {currentTheme}, setCurrentTheme } = useContext(Context);

    const [showBurgerClass, setShowBurgerClass] = useState('inactive');
    const [showNavItems, setShowNavItems] = useState('active');
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [darkMode, setDarkMode] = useState(false);
    // const [currentTheme, setCurrentTheme] = useState(
    //     {
    //       bgc: 'bg-slate-200'
    //     }
    // );

    const rootTheme = useContext(UserTheme);
    console.log('themetheme : ', rootTheme);



    function handleDarkMode() {

        if (darkMode) {
            
            setCurrentTheme(themesManager('light'));

            console.log('currentTheme :', currentTheme);
            setDarkMode(false);
            return currentTheme

        } else {

            setCurrentTheme(themesManager('dark'));

            console.log('currentTheme : ', currentTheme);
            setDarkMode(true);
            return currentTheme
        }

    }


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
        <nav className={`navbar flex md:h-24 w-full ${currentTheme === 'light' ? 'bg-white' : 'bg-black'}`}>
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
                        <li className="ml-8 w-">
                            <div onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
                                {
                                    (currentTheme === 'dark') ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><mask id="a" width="28.946" height="31.067" x="-3.089" y="-3.292" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M-3.089-3.292h28.946v31.067H-3.089z"/><path fillRule="evenodd" d="M10.147 2.205c-5.292 1.71-8.369 7.29-6.913 12.723 1.503 5.609 7.268 8.938 12.877 7.435a10.483 10.483 0 0 0 6.467-5.046c-.171.055-.345.107-.521.154-5.61 1.503-11.374-1.826-12.877-7.435a10.48 10.48 0 0 1 .967-7.831Z" clip-rule="evenodd"/></mask><path fill="#0E2C58" d="m10.147 2.205 1.748.972A2 2 0 0 0 9.53.302l.616 1.903Zm12.431 15.112 1.748.972a2 2 0 0 0-2.363-2.875l.615 1.903ZM5.166 14.41a8.515 8.515 0 0 1 5.596-10.302L9.532.302c-6.3 2.036-9.963 8.677-8.23 15.143l3.864-1.035Zm10.427 6.02a8.514 8.514 0 0 1-10.427-6.02l-3.864 1.035c1.789 6.676 8.65 10.638 15.327 8.85l-1.036-3.864Zm5.238-4.085a8.483 8.483 0 0 1-5.238 4.086l1.036 3.863a12.483 12.483 0 0 0 7.697-6.005l-3.495-1.945Zm1.132-.931c-.139.045-.28.087-.424.125l1.036 3.864c.209-.056.415-.117.619-.183l-1.23-3.806Zm-.424.125a8.514 8.514 0 0 1-10.428-6.02l-3.863 1.035c1.789 6.676 8.65 10.638 15.327 8.849l-1.036-3.864Zm-10.428-6.02a8.48 8.48 0 0 1 .784-6.342L8.399 1.232a12.48 12.48 0 0 0-1.151 9.322l3.863-1.036Z" mask="url(#a)"/></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><mask id="a" width="25" height="25" x="0" y="0" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M0 0h25v25H0z" /><path fill-rule="evenodd" d="M3.32 7.4c.233-.418.493-.82.78-1.2h16.8c.287.38.548.782.78 1.2H3.32Zm-.79 1.8c-.13.39-.237.79-.32 1.2h20.58c-.083-.41-.19-.81-.32-1.2H2.53ZM2 12.5c0-.1.001-.2.004-.3h20.992a10.686 10.686 0 0 1-.034 1.2H2.038A10.636 10.636 0 0 1 2 12.5Zm.35 2.7C3.542 19.69 7.634 23 12.5 23c4.866 0 8.958-3.31 10.15-7.8H2.35ZM12.5 2c2.538 0 4.866.9 6.682 2.4H5.818C7.634 2.9 9.962 2 12.5 2Z" clip-rule="evenodd" /></mask><path fill="#fff" d="M4.1 6.2v-2a2 2 0 0 0-1.6.799L4.1 6.2Zm-.78 1.2-1.748-.973A2 2 0 0 0 3.32 9.4v-2ZM20.9 6.2l1.6-1.201a2 2 0 0 0-1.6-.799v2Zm.78 1.2v2a2 2 0 0 0 1.748-2.973L21.68 7.4Zm-19.47 3-1.96-.398A2 2 0 0 0 2.21 12.4v-2Zm.32-1.2v-2a2 2 0 0 0-1.9 1.372l1.9.628Zm20.26 1.2v2a2 2 0 0 0 1.96-2.398l-1.96.398Zm-.32-1.2 1.9-.628a2 2 0 0 0-1.9-1.372v2Zm-20.466 3v-2a2 2 0 0 0-1.999 1.944l2 .056Zm20.992 0 1.999-.056a2 2 0 0 0-2-1.944v2Zm-.034 1.2v2a2 2 0 0 0 1.993-1.83l-1.993-.17Zm-20.924 0-1.993.17a2 2 0 0 0 1.993 1.83v-2Zm.312 1.8v-2a2 2 0 0 0-1.933 2.513L2.35 15.2Zm20.3 0 1.933.513A2 2 0 0 0 22.65 13.2v2ZM19.182 4.4v2a2 2 0 0 0 1.273-3.542L19.182 4.4Zm-13.364 0L4.545 2.858A2 2 0 0 0 5.818 6.4v-2ZM2.5 4.999c-.34.453-.65.93-.928 1.428l3.495 1.946c.189-.339.4-.663.631-.972L2.5 5ZM20.9 4.2H4.1v4h16.8v-4Zm2.528 2.227A12.51 12.51 0 0 0 22.5 5L19.302 7.4c.231.309.442.633.631.972l3.495-1.946ZM3.32 9.4h18.36v-4H3.32v4Zm.85 1.398c.067-.33.154-.655.258-.97L.63 8.572c-.154.465-.281.943-.38 1.43l3.92.796ZM22.79 8.4H2.21v4h20.58v-4Zm-2.218 1.428c.105.316.19.64.258.97l3.92-.796a12.436 12.436 0 0 0-.38-1.43l-3.798 1.256ZM2.53 11.2h19.942v-4H2.529v4Zm-2.524.944C.002 12.262 0 12.38 0 12.5h4c0-.082.001-.163.003-.244l-3.998-.112Zm22.99-1.944H2.006v4h20.99v-4ZM25 12.5c0-.119-.002-.238-.005-.356l-3.998.112c.002.081.003.162.003.244h4Zm-.045 1.07c.03-.354.045-.71.045-1.07h-4c0 .247-.01.49-.03.73l3.985.34ZM2.038 15.4h20.924v-4H2.038v4ZM0 12.5c0 .36.015.716.045 1.07l3.986-.34C4.01 12.99 4 12.748 4 12.5H0Zm.417 3.213C1.836 21.058 6.705 25 12.5 25v-4a8.504 8.504 0 0 1-8.216-6.313L.417 15.713ZM12.5 25c5.795 0 10.664-3.942 12.083-9.287l-3.866-1.026A8.504 8.504 0 0 1 12.5 21v4Zm10.15-11.8H2.35v4h20.3v-4ZM20.455 2.858A12.457 12.457 0 0 0 12.5 0v4c2.057 0 3.938.728 5.408 1.942l2.547-3.084ZM5.818 6.4h13.364v-4H5.818v4ZM12.5 0C9.48 0 6.705 1.074 4.545 2.858l2.547 3.084A8.457 8.457 0 0 1 12.5 4V0Z" mask="url(#a)" /></svg>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;