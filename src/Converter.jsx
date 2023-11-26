import { useState, useEffect, useRef } from "react";
import { Table } from "./Table";
import Select from 'react-select';
import formatRatesTable from "./Utilities/formatRatesTable";
import convertValue from './Utilities/convertValue';
import getOneCurrency from "./Utilities/getOneCurrency";


function Converter() {

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
        control: (styles, state) => ({...styles, backgroundColor: '#d9e8f6', borderColor: (state.isFocused ? '#c8db34' : 'none'), FontFamily: 'impact', borderRadius: '0' }),
        valueContainer: (styles) => ({...styles, fontFamily: 'karla-medium'}),

        option: (styles, state) => {
            return (
                {...styles, backgroundColor: state.isFocused ? '#4586bf' : '#d9e8f6', color: state.isFocused ? '#d9e8f6' : '#0D1A2B'}
            )
        }
    }

    const outputColorStyles = {
        control: (styles, state) => ({...styles, backgroundColor: '#d9f6f4', borderColor: (state.isFocused ? '#c8db34' : 'none'), FontFamily: 'impact', borderRadius: '0' }),
        valueContainer: (styles) => ({...styles, fontFamily: 'karla-medium'}),
        option: (styles, state) => {
            return (
                {...styles, backgroundColor: state.isFocused ? '#42b5ad' : '#d9f6f4', color: state.isFocused ? '#d9e8f6' : '#0D1A2B'}
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
            <div className="main flex-column text-center">

                <h1 id="title" className="font-kav text-8xl md:mt-40 mt-16">
                    The Cosmic Converter
                </h1>

                <ul className="flex justify-between space-x-8 my-24">
                    <li><a href="" className="info-items"><span className="inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-2 border-red-100 rounded-full">1</span>Enter amount</a></li>
                    <li><a href="" className="info-items"><span className="inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-2 border-red-100 rounded-full">2</span>Choose <strong className="hover:bg-sky-700 underline underline-offset-4 decoration-2 decoration-sky-300/80">from</strong> and <strong className="hover:bg-sky-700 underline underline-offset-4 decoration-2 decoration-green-300/80">to</strong> currency</a></li>
                    <li><a href="" className="info-items"><span className="inline-block p-0 w-14 h-14 text-center align-baseline leading-loose mr-4 relative -top-0.5 border-solid border-2 border-red-100 rounded-full">3</span>🎉 Hit convert</a></li>
                </ul>

                <form
                    className="flex flex-col p-16 bg-regal-blue shadow-xl shadow-blue-500/20 border-none rounded-xl"
                    onSubmit={(e) => e.preventDefault()}>

                    <div className="flex gap-8 justify-center">
                        <div>
                            <input 
                            className="block transition bg-transparent/10 outline-none underline underline-offset-8 text-8xl font-thin decoration-1 focus-within:bg-input-focus-blue"
                            type="number" 
                            step="0.01" min="0.00" 
                            defaultValue={''} 
                            placeholder="0.00"
                            ref={inputRef} onChange={handleInputChange}
                            />
                            {
                                showAmountErrorMessage &&
                                <div className="text-start">
                                    <p className="text-1xl text-red-500">
                                        * Veuillez entrer un montant
                                    </p>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-medium text-end font-karla-medium text-sky-300/80">from :</p>
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
                        <p className="font-medium text-end font-karla-medium text-green-300/80">to :</p>
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
                    <div>
                        <button
                            className="mt-8 bg-transparent hover:bg-orange-500 text-orange-500 font-karla-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                            onClick=
                            {
                                () => {
                                    const table = convertValue(inputRef.current.value, inputValue, targetCurrencies, targetCurrencyRef.current.props.value, setShowAmountErrorMessage, setShowCurrencyErrorMessage);
                                    setTableResults(table);
                                }
                            }>
                            Convertir
                        </button>
                    </div>
                </form>
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