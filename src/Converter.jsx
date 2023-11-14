import { useState, useEffect, useRef } from "react";
import Select from 'react-select';


function Converter() {
    const [rateSelectOption, setRateSelectOption] = useState([]);

    const defaultFirstCurrency = {
        currency: 'EUR',
        value: 'EUR',
        label: 'EUR',
        rate: '1'
    };

    const [defaultUsdRate, setDefaultUsdRate] = useState('');

    const defaultTargetCurrenciesKey = {
        currency: 'USD',
        value: 'USD',
        label: 'USD',
        rate: '1.05'
    };

    const [firstCurrency, setFirstCurrency] = useState('');
    const [defaultTargetCurrency, setDefaultTargetCurrency] = useState(defaultTargetCurrenciesKey);

    const [targetCurrencies, setTargetCurrencies] = useState('');


    const [showConvert, setShowConvert] = useState ('');
    const [inputValue, setInputValue] = useState('')

    const [dataTable, setDataTable] = useState(rateSelectOption);
    const [inputCurrencyCustomRateTable, setInputCurrencyCustomRateTable] = useState('');

    //console.log('rateSelectOption', rateSelectOption);

    /** 
     *  This function updates rates according to a chosen currency label
     * @param ratesTable - The rates tables from the fetch api
     * @param targetCurrency - currency to set by default
     * @return {array} - array of all rates values with target currency rate set to 1
    */
    const getRatesSetToInputCurrency = (ratesTable, targetCurrency) => {
        const rateEntries = Object.entries(ratesTable);
        const rateArray = rateEntries.map(([currency, rate]) => {
            return {
                currency: currency,
                value: currency,
                label: currency,
                rate: parseFloat(rate / ratesTable[targetCurrency]).toFixed(4)
            }
        });
        const defaultInputCurrency = rateArray.filter((currency) => currency.label === targetCurrency);
        //const defaultTargetCurrency = rateArray.filter((currency) => currency.label === 'USD');
        
        setFirstCurrency(defaultInputCurrency);
        //setDefaultTargetCurrency(defaultTargetCurrency);
        
        return rateArray;
    }

    const getOutputCurrencyRates = (table, currencyLabel) => {

        const outputCurrencyRate = table.filter((currency) => currency.label === currencyLabel);
        console.log('outputCurrencyRate', outputCurrencyRate);
        return outputCurrencyRate;
        
    }

    useEffect(() => {

        async function fetchExchangeRate() {

            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                setDataTable(data.rates);

                const selectData = getRatesSetToInputCurrency(data.rates, 'EUR');
                setRateSelectOption(selectData);
                setInputCurrencyCustomRateTable(selectData);

                const selectOutputData = getOutputCurrencyRates(selectData, 'USD');
                setTargetCurrencies(selectOutputData);
                setDefaultUsdRate(selectOutputData[0].rate); 

            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }

        fetchExchangeRate();
    }, []);

    
    function handleFirstCurrency(data) {

        console.log('getRatesSetToInputCurrency', getRatesSetToInputCurrency(dataTable, data.label));
        const activeSelectData = getRatesSetToInputCurrency(dataTable, data.label);
        setInputCurrencyCustomRateTable(activeSelectData);
        
    }
    
    const outputCurrentData = useRef([]);

    useEffect (() => {

        function convertTableToArray(object) {
    
            if(!Array.isArray(object)) {
                object = [object];
            }
            return object;
            
        }

        const outputTable = convertTableToArray(outputCurrentData.current.props.value);

        const updatedOutputCurrencies = outputTable.map(currencyInfo => {
            console.log('inputCurrencyCustomRateTable ', inputCurrencyCustomRateTable);
            if(inputCurrencyCustomRateTable.length > 0) {
                const outputCurrenciesTable = getOutputCurrencyRates(inputCurrencyCustomRateTable, currencyInfo.label);
                return outputCurrenciesTable[0];
            }
        });

        setTargetCurrencies(updatedOutputCurrencies);


    }, [firstCurrency]);


    function handleTargetCurrencies(data) {

        const updatedTargetCurrencies = data.map(currencyInfo => {
            const targetCurrenciesTable = getOutputCurrencyRates(inputCurrencyCustomRateTable, currencyInfo.label)
            return targetCurrenciesTable[0];
        });

        setTargetCurrencies(updatedTargetCurrencies);

    }

    console.log('targetCurrencies', targetCurrencies);


    const convertValue = () => {

        let resultText = '';
        console.log(defaultTargetCurrency);

        targetCurrencies.forEach(currency => {
            resultText += `<p> la valeur convertie en <strong> ${currency.label }</strong> est ${(inputValue * currency.rate).toFixed(3) }</p> <br/> `
        });
        setShowConvert(resultText);
    }



    function handleSubmit(e) {
        e.preventDefault();
    }

    /**
     * This function gets the input value and set the state of const inputValue
     * @param inputValue - input value.
     */
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Devise initiale :</h3>
                <div style={{ width: '120px'}}>

                    <Select
                        options={rateSelectOption}
                        defaultValue={firstCurrency}
                        value={firstCurrency}
                        onChange={handleFirstCurrency}
                        autoFocus={true}
                    />

                </div>
                <span style={{display: 'block', height: '1rem'}}></span>
                
                <input type="number" step="0.01" defaultValue={''} placeholder="Entrez le montant à convertir" onChange={handleInputChange} style={{width: '12rem', border: '1px solid lightGray', padding: '0.5rem', borderRadius: '4px'}}/>

                <h3>À convertir en :</h3>
                <div style={{ width: 'fit-content'}}>

                        <Select
                            isMulti
                            options={rateSelectOption}
                            defaultValue={defaultTargetCurrenciesKey}
                            //value={targetCurrencies}
                            onChange={handleTargetCurrencies}
                            autoFocus={true}
                            ref={outputCurrentData}
                        />

                </div>
                <span style={{display: 'block', height: '1rem'}}></span>
                <div>
                    <button onClick={() => convertValue()}>Convertir</button>
                </div>
                <div dangerouslySetInnerHTML={{__html: showConvert}}>

                </div>
            </form>
        </>
    )
}

export default Converter;