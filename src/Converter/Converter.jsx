import { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../Utilities/Context";
import { Table } from "../Table";
import Results from "../Results";
import Select, { components } from 'react-select';
import formatRatesTable from "../Utilities/formatRatesTable";
import convertValue from '../Utilities/convertValue';
import getOneCurrency from "../Utilities/getOneCurrency";
import StarPosRight from "../Assets/Images/star_pos_right";
import StarPosLeft from "../Assets/Images/star_pos_left";
import DropdownLight from "../Assets/Images/dropdown_light";
import splitNumber from "../Utilities/splitNumber";
import PropTypes from 'prop-types';
import { getInputColorStyles } from './Converter.helper';

function Converter() {

    const { themeColors, getData, state } = useContext(Context);
    const { currentTheme } = state;

    const [targetCurrencyBackgroundColor, setTargetCurrencyBackgroundColor] = useState('#b0ecf6');

    const [defaultTargetCurrenciesKey, setDefaultTargetCurrenciesKey] = useState({
        currency: 'USD',
        value: 'USD',
        label: 'USD',
        rate: '',
        color: targetCurrencyBackgroundColor
    });

    const [rateSelectOption, setRateSelectOption] = useState([]);
    const [firstCurrency, setFirstCurrency] = useState('');

    const [targetCurrencies, setTargetCurrencies] = useState('');

    const [inputValue, setInputValue] = useState('');

    const [dataTable, setDataTable] = useState(rateSelectOption);
    const [inputCurrencyCustomRateTable, setInputCurrencyCustomRateTable] = useState('');

    const [showAmountErrorMessage, setShowAmountErrorMessage] = useState(false);
    const [showCurrencyErrorMessage, setShowCurrencyErrorMessage] = useState(false);

    const [tableResults, setTableResults] = useState(null);

    const targetCurrencyRef = useRef([]);
    const inputRef = useRef();

    const selectRef = useRef();

    const inputColorStyles = getInputColorStyles(currentTheme);

    const outputColorStyles = {
        control: (styles, { isFocused }) => {

            let borderStyle = '';

            if (currentTheme === 'light') {
                borderStyle = "1px solid #FFEDD5";
            } else if (currentTheme === 'dark') {
                borderStyle = "1px solid #48341c";
            }

            if (isFocused) {
                borderStyle = "none";
            }

            return (
                { ...styles, minHeight: 'min-content', maxWidth: 'content', padding: '2px', backgroundColor: 'none', border: borderStyle }
            )
        },
        valueContainer: (styles) => ({ ...styles, flexWrap: 'nowrap', padding: '0px', fontFamily: 'Questrial', overflow: 'scroll' }),
        multiValue: (styles) => {

            return (
                { ...styles, margin: '0px 8px 0px 0px', padding: '4px', minWidth: 'fit-content', borderRadius: '5px', "&:hover": { color: "#ffb95d" }, backgroundColor: '#282c5f' }
            )
        },

        multiValueLabel: (styles) => {

            return (
                { ...styles, color: '#5582dd99H' }
            )
        },

        option: (styles, { isFocused, isSelected, isDisabled }) => {

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
                if (isSelected) {
                    activeOptionBackgroundColor = '#d7d7ff';
                } else {
                    activeOptionBackgroundColor = '#dfeeff';
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
        },

        menuList: (styles) => {

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
        },
    };

    const DropdownIndicator = (props) => {

        const { getStyles } = props;

        return (
            <components.DropdownIndicator {...props}>
                <div className="cursor-pointer">
                    <DropdownLight style={getStyles('dropdownIndicator', props)} />
                </div>
            </components.DropdownIndicator>
        );
    };

    const dropdownIndicatorStyles = (styles) => ({ ...styles, cursor: 'pointer' });


    useEffect(() => {

        async function fetchExchangeRate() {

            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                setDataTable(data.rates);

                const selectData = formatRatesTable(data.rates, 'EUR', setFirstCurrency);
                setRateSelectOption(selectData);
                setInputCurrencyCustomRateTable(selectData);

                const selectOutputData = getOneCurrency(selectData, 'USD');
                setTargetCurrencies(selectOutputData);
                setDefaultTargetCurrenciesKey({
                    ...defaultTargetCurrenciesKey,
                    rate: selectOutputData[0].rate
                });

            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }

        fetchExchangeRate();

    }, []);


    useEffect(() => {

        function convertTableToArray(object) {

            if (!Array.isArray(object)) {
                object = [object];
            }
            return object;

        }

        const outputTable = convertTableToArray(targetCurrencyRef.current.props.value);

        const updatedOutputCurrencies = outputTable.map(currencyInfo => {

            if (inputCurrencyCustomRateTable.length > 0) {
                const outputCurrenciesTable = getOneCurrency(inputCurrencyCustomRateTable, currencyInfo.label);
                return outputCurrenciesTable[0];
            }

        });

        setTargetCurrencies(updatedOutputCurrencies);

    }, [firstCurrency, inputCurrencyCustomRateTable]);



    function handleTargetCurrencies(data) {
        const updatedTargetCurrencies = data.map(currencyInfo => {
            const targetCurrenciesTable = getOneCurrency(inputCurrencyCustomRateTable, currencyInfo.label)
            return targetCurrenciesTable[0];
        });

        setTargetCurrencies(updatedTargetCurrencies);
        setShowCurrencyErrorMessage(false);
        handleTargetCurrencyBackgroundColor();
    }

    function handleFirstCurrency(data) {
        const activeSelectData = formatRatesTable(dataTable, data.label, setFirstCurrency);
        setInputCurrencyCustomRateTable(activeSelectData);
    }

    function handleInputChange(e) {

        setInputValue(e.target.value);
        setShowAmountErrorMessage(false);
    }

    const handleTextOnly = data => {
        if ((data.keyCode < 65 && data.keyCode !== 16 && data.keyCode !== 20 && data.keyCode !== 8) || data.keyCode > 90) {
            data.preventDefault();
        }
    }

    function handleTargetCurrencyBackgroundColor() {
        let backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        setTargetCurrencyBackgroundColor(backgroundColor);
    }

    function formatDecimalInput(data) {

        const value = data.target.value;
        const splittedInputValue = splitNumber(value);
        const decimalInputValue = splittedInputValue[1];


        let formattedWithDecimalInputValue = '';
        let decimalListValues = [undefined, '00', ''];

        if (decimalListValues.includes(decimalInputValue)) {
            formattedWithDecimalInputValue = parseFloat((data.target.value)).toFixed(2);
        } else {
            formattedWithDecimalInputValue = data.target.value;
        }

        data.target.value = formattedWithDecimalInputValue;
        
    }

    return (
        <>
            <div
                data-name="converter--component"
                className="w-full">
                <div className="xs:w-3/4 w-4/5 mx-auto flex-column text-center">
                    <h1 id="title" className={`font-playfair-black text-7xl md:mt-35 mt-20 ${themeColors.main_text}`}>
                        The Cosmic Converter
                        <span className="absolute md:top-[8rem] top-[8rem] after:inline-block after:w-10 after:h-10">
                            <StarPosRight />
                        </span>
                    </h1>
                    <div className="w-fit mx-auto">
                        <h2 className={`font-questrial text-5xl w-full my-2 ${themeColors.main_text}`}>
                            <span className={`relative md:-left-24 md:-top-10 -top-[4rem] -left-[4rem] md:scale-100 scale-75 inline-block w-10 h-10`}>
                                <StarPosLeft />
                            </span>
                            Convert <span className={`before:absolute before:block before:-inset-2 ${themeColors.element_highlight} before:-skew-y-3 before:-skew-x-6 relative inline-block`}><span className="relative">instantly</span></span> any currency to many currencies
                        </h2>
                    </div>


                    <ul className="flex flex-col xxs:flex-row xxs:w-full xs:space-x-8 xs:space-y-0 lg:w-4/5 md:w-full justify-between mx-auto mt-24 mb-12">
                        <li className="mb-[1rem]">
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xxs:justify-center justify-left transitionLeft">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mx-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>1</span>
                                    <span className="whitespace-nowrap xxs:pl-0 pl-8">Enter amount</span>
                                </div>
                            </a>
                        </li>
                        <li className="mb-[1rem] ml-0">
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xxs:justify-center justify-left transitionUpStrong">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mx-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>2</span>
                                    <span className="xs:whitespace-nowrap whitespace-wrap text-wrap xxs:pl-0 pl-8">Choose <span className="hidden xxs:inline-block"><strong className="underline underline-offset-4 decoration-2 decoration-amber-500">from</strong> and <strong className="underline underline-offset-4 decoration-2 decoration-amber-500">to</strong></span> currencies</span>
                                </div>
                            </a>
                        </li>
                        <li className="mb-[1rem] ml-0">
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xxs:justify-center justify-left transitionRight">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mx-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>3</span>
                                    <span className="whitespace-nowrap xxs:pl-0 pl-8">🎉 Hit convert !</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={`w-full py-20 ${themeColors.banner}`}>
                    <form
                        className={`flex flex-wrap md:gap-8 justify-center w-4/5 xs:w-3/4 md:w-5/6 lg:w-3/5 mx-auto sm:p-16 p-8 transitionUp ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} shadow-xl shadow-blue-500/20 border-none rounded-3xl`}
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-wrap md:gap-8 justify-center">
                            <div className={`md:ml-6 ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd}`}>
                                <div>
                                    <legend className={`relative top-5 xs:inset-x-[290px] xxs:inset-x-[236px] inset-x-[164px] w-fit h-fit px-3 font-medium font-questrial ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} ${themeColors.accent_text}`}>from :</legend>
                                    <div className={`flex flex-col justify-start p-4 mb-8 border border-orange-200 hover:border-orange-400 focus:border-orange-400 focus-within:border-orange-400 rounded-3xl xs:w-[378px] xxs:w-[320px] w-[250px] min-h-[79px] max-h-[79px]`} ref={selectRef} >
                                        <p className="text-slate-300 text-[1.2rem] pl-4">Enter amount</p>
                                        <div className="flex flex-row gap-8">
                                            <label className="inline-block rounded-xl">
                                                <input
                                                    className={`xs:w-[238px] xxs:w-[180px] w-[140px] transition outline-0 rounded-xl underline underline-offset-4 text-[2.60rem] pl-4 font-light decoration-1 decoration-slate-400 ${themeColors.component.text} ${themeColors.component.input_bg}`}
                                                    type="number"
                                                    step="0.01" min="0.00"
                                                    defaultValue={''}
                                                    placeholder="0.00"
                                                    ref={inputRef}
                                                    onChange={handleInputChange}
                                                    onBlur={formatDecimalInput}
                                                    onInvalid={(e) => e.preventDefault()}
                                                />
                                            </label>
                                            <div className="flex self-center">
                                                <Select
                                                    className="block xxs:min-w-[96px] xxs:max-w-[96px] min-w-[80px] xxs:inset-x-0 -inset-x-5"
                                                    options={rateSelectOption}
                                                    defaultValue={firstCurrency}
                                                    value={firstCurrency}
                                                    onChange={handleFirstCurrency}
                                                    styles={inputColorStyles}
                                                    autoFocus={true}
                                                    onKeyDown={handleTextOnly}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            {
                                                showAmountErrorMessage &&
                                                <div className="absolute inset-y-4 -inset-x-3 text-[1.4rem]">
                                                    <p className="text-1xl text-orange-600">
                                                        * Please add an amount
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`md:mr-6 ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd}`}>
                                <div>
                                    <legend className={`relative top-5 xs:inset-x-[28px] inset-x-[35px] w-fit h-fit px-3 font-medium font-questrial ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} ${themeColors.accent_text}`}>to :</legend>
                                    <div className={`flex flex-col justify-between xs:w-[378px] xxs:w-[320px] w-[250px] min-h-[79px] max-h-[79px] p-4 mb-8 border border-orange-200 hover:border-orange-400 focus-within:border-orange-400 rounded-3xl`}>
                                        <p className="text-end text-slate-300 text-[1.2rem] pr-4">add currencies</p>
                                        <div>
                                            <Select
                                                isMulti
                                                options={rateSelectOption}
                                                components={{ DropdownIndicator }}
                                                defaultValue={defaultTargetCurrenciesKey}
                                                value={targetCurrencies}
                                                onChange={handleTargetCurrencies}
                                                styles={{ ...outputColorStyles, DropdownIndicator: dropdownIndicatorStyles }}
                                                autoFocus={true}
                                                ref={targetCurrencyRef}
                                                isClearable={true}
                                            />
                                        </div>
                                        <div className="relative">
                                            {
                                                showCurrencyErrorMessage &&
                                                <div className="absolute inset-y-4 -inset-x-3 text-[1.4rem]">
                                                    <p className="text-1xl text-orange-600">
                                                        * Please select at least one currency
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex self-center">
                                <div>
                                    <button
                                        className={`my-6 ${themeColors.button.default} ${themeColors.button.hover} ${themeColors.button.active} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}
                                        onClick=
                                        {
                                            () => {
                                                const table = convertValue(inputRef.current.value, inputValue, targetCurrencies, targetCurrencyRef.current.props.value, setShowAmountErrorMessage, setShowCurrencyErrorMessage);
                                                getData(inputValue, firstCurrency[0].currency);
                                                setTableResults(table);
                                            }
                                        }>
                                        Convert
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div>
                    {
                        tableResults && (
                            <Results>
                                <Table
                                    list={tableResults} />
                            </Results>
                        )
                    }
                </div>
            </div>
        </>
    )
}

Results.propTypes = {
    children: PropTypes.node.isRequired
};

Converter.propTypes = {
    getStyles: PropTypes.string,
    tableResults: PropTypes.shape({
        label: PropTypes.arrayOf(PropTypes.string).isRequired,
        values: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        )
    })
};

export default Converter;