
const themesManager = (theme) => {

    let colorSet = {};

    if (theme === 'light') {
        colorSet = {
            bckgd_primary: 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100',
            bckgd_secondary: 'bg-gradient-to-tr from-purple-50 to-blue-200',
            nav_bg: 'bg-slate-100',
            main_text: 'text-[#0E2C58]',
            text: 'text-slate-600',
            accent_text: 'text-orange-500',
            regular_text: 'text-[#1D3A63]',
            banner: 'bg-[#E8F5FF]',
            icon : {
                hover: 'hover:bg-slate-300 transition duration-200 ease-in-out',
                active: 'active:bg-slate-400',
                ring: 'ring-orange-400',
            },
            border : {
                accent: 'border-orange-500',
            },
            element_highlight: 'before:bg-[#FFC47C]',
            select : {
                bckgd: 'bg-white',
                input_bg: 'bg-orange-100 focus-within:bg-orange-200',
                text: 'text-slate-700',
            },
            animate_settings : {
                bckgd : 'transition-all duration-300 ease-in-out',
                button : 'transition-all duration-200 ease-out',
            },
            button : {
                default: 'border-[1px] border-orange-400 py-3 px-4 rounded-2xl w-[12rem]',
                hover: 'hover:bg-[#FB6D3C] hover:shadow-xl hover:shadow-orange-600/40 hover:text-slate-200',
            }
        };
        return colorSet;
    }

    if (theme === 'dark') {
        colorSet = {
            bckgd_primary: 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900',
            bckgd_secondary: 'bg-gradient-to-tr from-blue-900 to-zinc-900',
            nav_bg: 'bg-black',
            main_text: 'text-[#fefefe]',
            text: 'text-slate-200',
            accent_text: 'text-orange-500',
            regular_text: 'text-[#fbfbfb]',
            banner: 'bg-[#384774]',
            icon : {
                hover: 'hover:bg-gray-700 transition duration-200 ease-in-out',
                active: 'active:bg-gray-500',
                ring: 'ring-orange-400',
            },
            border : {
                accent: 'border-amber-300',
            },
            element_highlight: 'before:bg-orange-500',
            select : {
                bckgd: 'bg-regal-blue',
                input_bg: 'bg-slate-700 focus-within:bg-slate-800',
                text: 'text-slate-200',
            },
            animate_settings: 'transition-all duration-300 ease-in-out',
            button : {
                default: 'border-[1px] border-orange-400 py-3 px-4 rounded-2xl',
                hover: 'hover:bg-[#FB6D3C] hover:shadow-xl hover:shadow-orange-600/40 hover:text-slate-200',
            }
        };
        return colorSet;
    }

}

export default themesManager;