
const themesManager = (theme) => {

    let colorSet = {};

    if (theme === 'light') {
        colorSet = {
            bckgd_primary: 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100',
            bckgd_secondary: 'bg-gradient-to-tr from-purple-50 to-blue-200',
            nav_bg: 'bg-slate-100',
            text: 'text-slate-600',
            main_text: 'text-[#0E2C58]',
            regular_text: 'text-[#1D3A63]',
            banner: 'bg-[#E8F5FF]',
            icon : {
                hover: 'hover:bg-slate-300 transition duration-200 ease-in-out',
                active: 'active:bg-slate-400',
                ring: 'ring-slate-500',
            },
            border : {
                accent: 'border-orange-500',
            },
            element_highlight: 'before:bg-[#FFC47C]',
            
        };
        return colorSet;
    }

    if (theme === 'dark') {
        colorSet = {
            bckgd_primary: 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900',
            bckgd_secondary: 'bg-gradient-to-tr from-blue-900 to-zinc-900',
            nav_bg: 'bg-black',
            text: 'text-slate-200',
            main_text: 'text-[#fefefe]',
            regular_text: 'text-[#fbfbfb]',
            banner: 'bg-[#384774]',
            icon : {
                hover: 'hover:bg-gray-700 transition duration-200 ease-in-out',
                active: 'active:bg-gray-500',
                ring: 'ring-slate-600',
            },
            border : {
                accent: 'border-amber-300',
            },
            element_highlight: 'before:bg-orange-500',
        };
        return colorSet;
    }

}

export default themesManager;