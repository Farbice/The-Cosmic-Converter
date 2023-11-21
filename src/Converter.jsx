import { useState, useEffect, useRef } from "react";
import { Table} from "./Table";
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
                    rate: selectOutputData[0].rate});

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
                <h1>
                    The Cosmic Converter
                </h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <h3>Devise initiale :</h3>
                    <div style={{ width: '120px' }}>

                        <Select
                            options={rateSelectOption}
                            defaultValue={firstCurrency}
                            value={firstCurrency}
                            onChange={handleFirstCurrency}
                            autoFocus={true}
                        />

                    </div>
                    <span style={{ display: 'block', height: '1rem' }}></span>

                    <input type="number" step="0.01" min="0" defaultValue={''} placeholder="Entrez le montant à convertir" ref={inputRef} onChange={handleInputChange} style={{ width: '12rem', border: '1px solid lightGray', padding: '0.5rem', borderRadius: '4px' }} />
                    {
                        showAmountErrorMessage &&
                        <div style={{ fontSize: '15px', color: 'red' }}>
                            * Veuillez entrer un montant
                        </div>

                    }
                    <h3>À convertir en :</h3>
                    <div style={{ width: 'fit-content' }}>

                        <Select
                            isMulti
                            options={rateSelectOption}
                            defaultValue={defaultTargetCurrenciesKey}
                            value={targetCurrencies}
                            onChange={handleTargetCurrencies}
                            autoFocus={true}
                            ref={targetCurrencyRef}
                        />

                    </div>
                    {
                        showCurrencyErrorMessage &&
                        <div style={{ fontSize: '15px', color: 'red' }}>
                            * Veuillez sélectionner au moins une devise
                        </div>

                    }
                    <span style={{ display: 'block', height: '1rem' }}></span>
                    <div>
                        <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
                        <Table list={ tableResults }/>
                    }
                </div>
            </div>
        </>
    )
}

export default Converter;