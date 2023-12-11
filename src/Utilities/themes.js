
const themesManager = (theme) => {

    let colorSet = {};

    if (theme === 'light') {
        colorSet = {
            bckgd: 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500',
            nav_bg: 'bg-slate-200',
            nav_text: 'text-slate-800',
            test: 'bg-slate-300',
            icon : {
                hover: 'bg-slate-300',
                active: 'bg-slate-400',
            }
        };
        return colorSet;
    }

    if (theme === 'dark') {
        colorSet = {
            bckgd: 'bg-gradient-to-br from-blue-900 via-blue-900 to-gray-900',
            nav_bg: 'bg-black',
            nav_text: 'text-slate-200',
            test: 'bg-sky-300',
            icon : {
                hover: 'bg-gray-800',
                active: 'bg-gray-700',
            }
        };
        return colorSet;
    }

}

export default themesManager;