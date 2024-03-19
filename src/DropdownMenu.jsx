import { useContext } from "react";
import { Context } from "./Utilities/Context";
import PropTypes from 'prop-types';

function DropdownMenu ({animate}) {

    const { themeColors } = useContext(Context);

    return (
        <div className={`dropdownmenu absolute z-50 top-20 p-8 rounded-xl shadow-xl shadow-blue-500/20 ${themeColors.nav_bg} ${animate}`}>
            <button className={`font-questrial ${themeColors.button.default} ${themeColors.button.hover} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}>
                <a href="mailto:fab.louis.971@gmail.com" target="blank">Get in touch</a>
            </button>
        </div>
    );
}

DropdownMenu.propTypes = {
    animate: PropTypes.string.isRequired
};

export default DropdownMenu;