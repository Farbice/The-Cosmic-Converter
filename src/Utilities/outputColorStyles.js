export const getOutputColorStyles = (state) => {
    const controlStyle= (styles, { isFocused }) => {

        let borderStyle = '';

        if (state.currentTheme === 'light') {
            borderStyle = "1px solid #FFEDD5";
        } else if (state.currentTheme === 'dark') {
            borderStyle = "1px solid #48341c";
        }

        if (isFocused) {
            borderStyle = "none";
        }

        return (
            { ...styles, minHeight: 'min-content', maxWidth: 'content', padding: '2px', backgroundColor: 'none', border: borderStyle }
        )
    };

    const valueContainerStyle = (styles) => ({ ...styles, flexWrap: 'nowrap', padding: '0px', fontFamily: 'Questrial', overflow: 'scroll' });
    const multiValueStyle = (styles) => {

        return (
            { ...styles, margin: '0px 8px 0px 0px', padding: '4px', minWidth: 'fit-content', borderRadius: '5px', "&:hover": { color: "#ffb95d" }, backgroundColor: '#282c5f' }
        )
    };

    const multiValueLabelStyle= (styles) => {

        return (
            { ...styles, color: '#5582dd99H' }
        )
    };

    const optionStyle = (styles, { isFocused, isSelected, isDisabled }) => {

        let optionBackgroundColor = '';
        let optionColor = '';
        let activeOptionBackgroundColor = '';
        let activeOptionColor = '';

        if (state.currentTheme === 'light') {
            if (isFocused) {
                optionBackgroundColor = '#f7e5d7';
                optionColor = '#FB6D3C';
            } else {
                optionBackgroundColor = '#fffefd';
                optionColor = '#5a6a7e';
            }
        } else if (state.currentTheme === 'dark') {
            if (isFocused) {
                optionBackgroundColor = '#5a6a7e';
                optionColor = '#fff5e9';
            } else {
                optionBackgroundColor = '#1E293B';
                optionColor = '#a9b7c7';
            }
        }


        if (state.currentTheme === 'light') {
            if (isSelected) {
                activeOptionBackgroundColor = '#d7d7ff';
            } else {
                activeOptionBackgroundColor = '#dfeeff';
            }
        } else if (state.currentTheme === 'dark') {
            if (!isDisabled) {
                if (isSelected) {
                    activeOptionBackgroundColor = '#ee711e';
                } else {
                    activeOptionBackgroundColor = '#f1a164';
                }
            }
        }

        return (
            {
                ...styles, backgroundColor: optionBackgroundColor, color: optionColor,
                ':active': { ...styles[':active'], backgroundColor: activeOptionBackgroundColor, color: activeOptionColor },
            }
        )
    };

    const menuListStyle = (styles) => {

        let menuListBackgroundColor = '';

        if (state.currentTheme === 'light') {
            menuListBackgroundColor = '#ffff';
        }
        else if (state.currentTheme === 'dark') {
            menuListBackgroundColor = '#1E293B';
        }

        return (
            { ...styles, borderRadius: '5px', backgroundColor: menuListBackgroundColor }
        )
    };

    return {
        control: controlStyle,
        valueContainer: valueContainerStyle,
        multiValue: multiValueStyle,
        multiValueLabel: multiValueLabelStyle,
        option: optionStyle,
        menuList: menuListStyle,
    };
};