
const themesManager = (theme, colorSet) => {
    if (theme === 'dark') {
        colorSet = {
            bgc: 'bg-slate-800',
        };
        return colorSet;
    }

    if (theme === 'light') {
        colorSet = {
            bgc: 'bg-slate-200',
        };
        return colorSet;
    }
}

export default themesManager;