
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
            result_text: 'text-[#282c5f]',
            banner: 'bg-[#E8F5FF]',
            icon : {
                hover: 'hover:bg-slate-300 transition duration-200 ease-in-out',
                active: 'active:bg-slate-400',
                ring: 'ring-orange-400',
            },
            border : {
                accent: 'border-orange-500',
                result: 'border-[#393C5F]',
            },
            element_highlight: 'before:bg-[#FFC47C]',
            component : {
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
                active: 'active:shadow-md',
            },
            title : {
                bckgd : 'bg-[#F0F4FA]',
            },
            navbar : {
                burger: 'stroke-slate-700',
                burger_hover: 'hover:bg-slate-300',
            },
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
            result_text: 'text-slate-100',
            banner: 'bg-[#384774]',
            icon : {
                hover: 'hover:bg-gray-700 transition duration-200 ease-in-out',
                active: 'active:bg-gray-500',
                ring: 'ring-orange-400',
            },
            border : {
                accent: 'border-amber-300',
                result: 'border-slate-100/50',
            },
            element_highlight: 'before:bg-orange-500',
            component : {
                bckgd: 'bg-regal-blue',
                input_bg: 'bg-slate-700 focus-within:bg-slate-800',
                text: 'text-slate-200',
            },
            animate_settings : {
                bckgd : 'transition-all duration-300 ease-in-out',
                button : 'transition-all duration-200 ease-out',
            },
            button : {
                default: 'border-[1px] border-orange-400 py-3 px-4 rounded-2xl w-[12rem]',
                hover: 'hover:bg-[#FB6D3C] hover:shadow-xl hover:shadow-orange-600/40 hover:text-slate-200',
                active: 'active:shadow-md',
            },
            title : {
                bckgd : 'bg-[#F0F4FA]',
            },
            navbar : {
                burger: 'stroke-slate-200',
                burger_hover: 'hover:bg-gray-700',
            },
        };
        return colorSet;
    }

}

export default themesManager;