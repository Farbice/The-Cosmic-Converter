import { useState, useEffect, useRef, useContext } from "react";
import { Context } from "./Utilities/Context";
import { Table } from "./Table";
import Select from 'react-select';
import formatRatesTable from "./Utilities/formatRatesTable";
import convertValue from './Utilities/convertValue';
import getOneCurrency from "./Utilities/getOneCurrency";
import StarPosRight from "./Assets/Images/star_pos_right";
import StarPosLeft from "./Assets/Images/star_pos_left";

function Converter() {

    const { state: { currentTheme } } = useContext(Context);
    const { themeColors } = useContext(Context);

    const [defaultTargetCurrenciesKey, setDefaultTargetCurrenciesKey] = useState({
        currency: 'USD',
        value: 'USD',
        label: 'USD',
        rate: ''
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

    const inputColorStyles = {
        control: (styles, state) => ({ ...styles, backgroundColor: '#d9e8f6', borderColor: (state.isFocused ? '#c8db34' : 'none'), FontFamily: 'impact', borderRadius: '0' }),
        valueContainer: (styles) => ({ ...styles, fontFamily: 'karla-medium' }),

        option: (styles, state) => {
            return (
                { ...styles, backgroundColor: state.isFocused ? '#4586bf' : '#d9e8f6', color: state.isFocused ? '#d9e8f6' : '#0D1A2B' }
            )
        }
    }

    const outputColorStyles = {
        control: (styles, state) => ({ ...styles, backgroundColor: '#d9f6f4', borderColor: (state.isFocused ? '#c8db34' : 'none'), FontFamily: 'impact', borderRadius: '0' }),
        valueContainer: (styles) => ({ ...styles, fontFamily: 'karla-medium' }),
        option: (styles, state) => {
            return (
                { ...styles, backgroundColor: state.isFocused ? '#42b5ad' : '#d9f6f4', color: state.isFocused ? '#d9e8f6' : '#0D1A2B' }
            )
        }
    }


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
    }

    function handleFirstCurrency(data) {

        const activeSelectData = formatRatesTable(dataTable, data.label, setFirstCurrency);
        setInputCurrencyCustomRateTable(activeSelectData);

    }


    function handleInputChange(e) {
        setInputValue(e.target.value);
        setShowAmountErrorMessage(false);
    }

    return (
        <>
            <div
                data-name="converter--component"
                className="w-full">
                <div className="w-3/4 mx-auto flex-column text-center">
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
                            Convert <span className={`before:absolute before:block before:-inset-2 ${themeColors.element_highlight} before:-skew-y-3 before:-skew-x-6 relative inline-block`}><span className="relative">instantly</span></span> any currency to any currency
                        </h2>
                    </div>


                    <ul className="flex flex-row w-2/3 justify-between space-x-8 xl:bg-emerald-200 lg:w-4/5 lg:bg-purple-300 md:w-full md:bg-yellow-300 mx-auto mt-24 mb-12">
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap items-center justify-center">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>1</span>
                                    <span>Enter amount</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap items-center justify-center">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>2</span>
                                    <span>Choose <strong className="underline underline-offset-4 decoration-2 decoration-amber-500">from</strong> and <strong className="underline underline-offset-4 decoration-2 decoration-amber-500">to</strong> currency</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="" className={`info-items ${themeColors.text}`}>
                                <div className="flex flex-wrap items-center justify-center">
                                    <span className={`inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-[1px] ${themeColors.border.accent} rounded-full`}>3</span>
                                    <span>🎉 Hit convert</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={`w-full py-20 ${themeColors.banner}`}>
                    <form
                        className={`flex flex-col w-3/4 mx-auto p-16 ${currentTheme === 'light' ? 'bg-[#dae6fc] transition-all duration-300 ease-out' : 'bg-regal-blue transition-all duration-300 ease-out'} shadow-xl shadow-blue-500/20 border-none rounded-xl`}
                        onSubmit={(e) => e.preventDefault()}>

                        <div className="flex gap-8 justify-center bg-slate-200">
                            <div>
                                <label className="block py-2 px-6 min-w-full rounded-xl bg-transparent/10">
                                    <input
                                        className={`transition outline-none rounded-xl underline underline-offset-8 text-8xl font-thin decoration-1 decoration-slate-400 ${currentTheme === 'light' ? 'focus-within:bg-[#dce9f8] text-slate-700 bg-slate-300' : 'focus-within:bg-input-focus-blue bg-slate-700'}`}
                                        type="number"
                                        step="0.01" min="0.00"
                                        defaultValue={''}
                                        placeholder="0.00"
                                        ref={inputRef} onChange={handleInputChange}
                                    />
                                </label>
                                {
                                    showAmountErrorMessage &&
                                    <div className="text-start inline">
                                        <p className="text-1xl text-red-500">
                                            * N&rsquo;oubliez pas d&rsquo;entrer un montant
                                        </p>
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col justify-start">
                                <p className="font-medium text-end font-questrial text-sky-300/80">from :</p>
                                <div style={{ width: '120px' }}>

                                    <Select
                                        className="block file:bg-orange-200"
                                        options={rateSelectOption}
                                        defaultValue={firstCurrency}
                                        value={firstCurrency}
                                        onChange={handleFirstCurrency}
                                        styles={inputColorStyles}
                                        autoFocus={true}
                                    />

                                </div>
                            </div>
                        </div>


                        <span style={{ display: 'block', height: '1rem' }}></span>

                        <div className="flex flex-col items-center justify-between">
                            <p className="font-medium text-end font-questrial text-green-300/80">to :</p>
                            <div style={{ width: 'fit-content' }}>

                                <Select
                                    isMulti
                                    options={rateSelectOption}
                                    defaultValue={defaultTargetCurrenciesKey}
                                    value={targetCurrencies}
                                    onChange={handleTargetCurrencies}
                                    styles={outputColorStyles}
                                    autoFocus={true}
                                    ref={targetCurrencyRef}
                                />

                            </div>
                            {
                                showCurrencyErrorMessage &&
                                <div className="text-1xl text-red-500">
                                    * Veuillez sélectionner au moins une devise
                                </div>

                            }
                        </div>


                        <span style={{ display: 'block', height: '1rem' }}></span>
                        <div className="flex gap-8 self-center">
                            <div>
                                <button
                                    className="convert-button mt-8 py-2 px-4 bg-orange-500 hover:bg-gradient-to-r from-yellow-600 to-red-600 text-slate-300 font-questrial hover:text-white border border-orange-500 hover:border-transparent rounded"
                                    onClick=
                                    {
                                        () => {
                                            const table = convertValue(inputRef.current.value, inputValue, targetCurrencies, targetCurrencyRef.current.props.value, setShowAmountErrorMessage, setShowCurrencyErrorMessage);
                                            setTableResults(table);
                                        }
                                    }>
                                    Convert
                                </button>
                            </div>
                            <div>
                                <button className="reset-button mt-8 py-2 px-4 font-questrial bg-orange-200 text-slate-400 rounded">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {
                        tableResults &&
                        <Table list={tableResults} />
                    }
                </div>
            </div>
        </>
    )
}

export default Converter;