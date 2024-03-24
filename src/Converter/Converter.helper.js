export const getInputColorStyles = (currentTheme) => {
    const controlStyle = (styles) => ({ ...styles, backgroundColor: '#FB6D3C', border: 'none', borderRadius: '5px', });
    const singleValueStyle = (styles) => ({ ...styles, color: '#ffff' });
    const valueContainerStyle = (styles) => ({ ...styles, fontFamily: 'Questrial', paddingRight: "4px" });
    const dropdownIndicatorStyle = (styles, state) => ({ ...styles, paddingLeft: "4px", color: (state.isFocused ? '#ffff' : '#ffff'), "&:hover": { color: "#ffb95d" }, cursor: 'pointer' });
    const indicatorSeparatorStyle = (styles) => ({ ...styles, display: "none" });
    const menuListStyle = (styles) => {

        let menuListBackgroundColor = '';

        if (currentTheme === 'light') {
            menuListBackgroundColor = '#ffff';
        }
        else if (currentTheme === 'dark') {
            menuListBackgroundColor = '#1E293B';
        }

        return (
            { ...styles, borderRadius: '5px', backgroundColor: menuListBackgroundColor }
        )
    };

    const optionStyle = (styles, { isFocused, isSelected, isDisabled }) => {

        let optionBackgroundColor = '';
        let optionColor = '';
        let activeOptionBackgroundColor = '';
        let activeOptionColor = '';

        if (currentTheme === 'light') {
            if (isFocused) {
                optionBackgroundColor = '#f7e5d7';
                optionColor = '#FB6D3C';
            } else {
                optionBackgroundColor = '#fffefd';
                optionColor = '#5a6a7e';
            }
        } else if (currentTheme === 'dark') {
            if (isFocused) {
                optionBackgroundColor = '#5a6a7e';
                optionColor = '#fff5e9';
            } else {
                optionBackgroundColor = '#1E293B';
                optionColor = '#a9b7c7';
            }
        }


        if (currentTheme === 'light') {
            if (!isDisabled) {
                if (isSelected) {
                    activeOptionBackgroundColor = '#d7d7ff';
                } else {
                    activeOptionBackgroundColor = '#dfeeff';
                }
            }
        } else if (currentTheme === 'dark') {
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
    
    return {
        control: controlStyle,
        singleValue: singleValueStyle,
        valueContainer: valueContainerStyle,
        dropdownIndicator: dropdownIndicatorStyle,
        indicatorSeparator: indicatorSeparatorStyle,
        menuList: menuListStyle,
        option: optionStyle
    };
};