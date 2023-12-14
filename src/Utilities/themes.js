
const themesManager = (theme) => {

    let colorSet = {};

    if (theme === 'light') {
        colorSet = {
            bckgd: 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100',
            nav_bg: 'bg-slate-200',
            nav_text: 'text-slate-800',
            main_text: 'text-[#0E2C58]',
            regular_text: 'text-[#1D3A63]',
            test: 'bg-zinc-300',
            icon : {
                hover: 'hover:bg-slate-300 transition duration-200 ease-in-out',
                active: 'active:bg-slate-400',
                ring: 'ring-slate-500',
            }
            
        };
        return colorSet;
    }

    if (theme === 'dark') {
        colorSet = {
            bckgd: 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900',
            nav_bg: 'bg-black',
            nav_text: 'text-slate-200',
            main_text: 'text-[#fefefe]',
            regular_text: 'text-[#fbfbfb]',
            test: 'bg-red-300',
            icon : {
                hover: 'hover:bg-gray-700 transition duration-200 ease-in-out',
                active: 'active:bg-gray-500',
                ring: 'ring-slate-600',
            }
        };
        return colorSet;
    }

}

export default themesManager;