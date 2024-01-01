import { useState, useEffect, useRef, useContext } from "react";
import { Context } from "./Utilities/Context";
import { Table } from "./Table";
import Results from "./Results";
import Select, { components } from 'react-select';
import formatRatesTable from "./Utilities/formatRatesTable";
import convertValue from './Utilities/convertValue';
import getOneCurrency from "./Utilities/getOneCurrency";
import StarPosRight from "./Assets/Images/star_pos_right";
import StarPosLeft from "./Assets/Images/star_pos_left";
import DropdownLight from "./Assets/Images/dropdown_light";

function Converter() {

    const { themeColors, getData } = useContext(Context);

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

    const [selectOutputSize, setSelectOutputSize] = useState({
        width: '',
        height: ''
    });
    const selectRef = useRef();

    const inputColorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#FB6D3C', border: 'none', borderRadius: '5px' }),
        singleValue: (styles) => ({ ...styles, color: '#ffff' }),
        valueContainer: (styles) => ({ ...styles, fontFamily: 'Questrial', paddingRight: "4px" }),
        dropdownIndicator: (styles, state) => ({ ...styles, paddingLeft: "4px", color: (state.isFocused ? '#ffff' : '#ffff'), "&:hover": { color: "#ffb95d" }, cursor: 'pointer' }),
        indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
        menuList: (styles) => ({ ...styles, borderRadius: '5px' }),

        option: (styles, state) => {
            return (
                { ...styles, backgroundColor: state.isFocused ? '#f7e5d7' : '#fffefd', color: state.isFocused ? '#FB6D3C' : '#5a6a7e' }
            )
        }
    }

    const outputColorStyles = {
        control: (styles) => ({ ...styles, minHeight: 'min-content', maxWidth: 'content', padding: '2px', backgroundColor: 'none', border: '1px solid #FFEDD5' }),
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

        option: (styles, { data, isFocused, isSelected }) => {

            let backgroundColorValue = '#fffefd';
            let colorValue = '#5a6a7e';

            if (isFocused) {
                backgroundColorValue = '#f7e5d7';
                colorValue = '#FB6D3C';
            }

            if (isSelected) {
                console.log(data);
                if (data && data.color) {
                    backgroundColorValue = data.color;
                    console.log(backgroundColorValue);
                }
            }

            return (
                { ...styles, backgroundColor: backgroundColorValue, color: colorValue }
            )
        },
    };

    const DropdownIndicator = (props) => {

        // eslint-disable-next-line react/prop-types
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



    useEffect(() => {

        if (selectRef.current) {
            setSelectOutputSize({
                width: parseFloat(selectRef.current.offsetWidth),
                height: parseFloat(selectRef.current.offsetHeight)
            });
        }

        console.log(selectOutputSize.width, selectOutputSize.height);

    }, [selectOutputSize.width, selectOutputSize.height]);


    // useEffect(() => {

    //     if(targetCurrencyRef.current.props) {

    //         console.log(targetCurrencyRef.current.props.value);

    //         const selectValue = targetCurrencyRef.current.props.value;
    //         const lastSelectValue = selectValue[selectValue.length-1];
    //         console.log(lastSelectValue);

    //     }

    // }, [targetCurrencyRef.current.props]);


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

    return (
        <>
            <div
                data-name="converter--component"
                className="w-full">
                <div className="xs:w-3/4 w-4/5 mx-auto flex-column text-center">
                    <h1 id="title" className={`font-playfair-black text-7xl md:mt-35 mt-16 ${themeColors.main_text}`}>
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


                    <ul className="flex flex-col xxs:flex-row xxs:w-full xs:space-x-8 xs:space-y-0 lg:w-4/5 md:w-full justify-between space-y-8 mx-auto mt-24 mb-12">
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xs:justify-center justify-left">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>1</span>
                                    <span className="xs:pl-0 pl-8">Enter amount</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xs:justify-center justify-left">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>2</span>
                                    <span className="xs:pl-0 pl-8">Choose <strong className="underline underline-offset-4 decoration-2 decoration-amber-500">from</strong> and <strong className="underline underline-offset-4 decoration-2 decoration-amber-500">to</strong> currencies</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap w-full items-center xs:justify-center justify-left">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>3</span>
                                    <span className="xs:pl-0 pl-8">🎉 Hit convert !</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={`w-full py-20 ${themeColors.banner}`}>
                    <form
                        className={`flex flex-wrap md:gap-8 justify-center xs:w-3/4 md:w-5/6 lg:w-3/5 mx-auto sm:p-16 p-8 ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} shadow-xl shadow-blue-500/20 border-none rounded-3xl`}
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-wrap md:gap-8 justify-center">
                            <div className={`${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd}`}>
                                <div>
                                    <legend className={`relative top-5 xs:inset-x-[296px] inset-x-[255px] w-fit h-fit px-3 font-medium font-questrial ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} ${themeColors.accent_text}`}>from :</legend>
                                    <div className="flex flex-col justify-start p-4 mb-8 border border-orange-400 rounded-3xl" ref={selectRef}>
                                        <p className="text-slate-300 text-[1.2rem] pl-4">Enter amount</p>
                                        <div className="flex flex-row gap-8">
                                            <label className="inline-block rounded-xl">
                                                <input
                                                    className={`xs:max-w-sm max-w-xs transition outline-0 rounded-xl underline underline-offset-4 text-[2.60rem] pl-4 font-light decoration-1 decoration-slate-400 ${themeColors.component.text} ${themeColors.component.input_bg}`}
                                                    type="number"
                                                    step="0.01" min="0.00"
                                                    defaultValue={''}
                                                    placeholder="0.00"
                                                    ref={inputRef} onChange={handleInputChange}
                                                />
                                            </label>
                                            <div className="flex self-center">
                                                <Select
                                                    className="block min-w-[96px] max-w-[96px]"
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
                                                        * N&rsquo;oubliez pas d&rsquo;entrer un montant
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd}`}>
                                <div>
                                    <legend className={`relative top-5 xs:inset-x-[28px] inset-x-[155px] w-fit h-fit px-3 font-medium font-questrial ${themeColors.component.bckgd} ${themeColors.animate_settings.bckgd} ${themeColors.accent_text}`}>to :</legend>
                                    <div className={`flex flex-col justify-between min-w-[${selectOutputSize.width}px] max-w-[${selectOutputSize.width}px] min-h-[${selectOutputSize.height}px] max-h-[${selectOutputSize.height}px] p-4 mb-8 border border-orange-400 rounded-3xl`}>
                                        <p className="text-end text-slate-300 text-[1.2rem] pr-4">add currencies</p>
                                        <div className="">
                                            <div className="">
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
                                        </div>
                                        <div className="relative">
                                            {
                                                showCurrencyErrorMessage &&
                                                <div className="absolute inset-y-4 -inset-x-3 text-[1.4rem]">
                                                    <p className="text-1xl text-orange-600">
                                                        * Veuillez sélectionner au moins une devise
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-8 self-center">
                                <div>
                                    <button
                                        className={`${themeColors.button.default} ${themeColors.button.hover} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}
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
                                <div>
                                    <button className={`${themeColors.button.default} ${themeColors.button.hover} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}>
                                        <a href="">Reset</a>
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

export default Converter;