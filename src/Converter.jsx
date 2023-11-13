import { useState, useEffect } from "react";
import Select from 'react-select';


function Converter() {
    const [rateSelectOption, setRateSelectOption] = useState([]);

    const defaultFirstCurrency = {
        currency: 'EUR',
        value: 'EUR',
        label: 'EUR',
        rate: '1'
    };
    const defaultTargetCurrenciesKey = {
        currency: 'USD',
        value: 'USD',
        label: 'USD',
        rate:'1.05'
    };

    const [firstCurrency, setFirstCurrency] = useState(defaultFirstCurrency);
    const [defaultTargetCurrency, setDefaultTargetCurrency] = useState(defaultTargetCurrenciesKey);

    const [targetCurrencies, setTargetCurrencies] = useState([]);


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
                const selectData = getRatesSetToInputCurrency(data.rates, firstCurrency.currency);
                //console.log('selectData ', selectData);
                setRateSelectOption(selectData);
                setInputCurrencyCustomRateTable(selectData);
                const selectOutputData = getOutputCurrencyRates(selectData, defaultTargetCurrency.label);
                setDefaultTargetCurrency(selectOutputData);
                //setTargetCurrencies(selectOutputData);
                console.log('selectOutputData', selectOutputData);

            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }

        fetchExchangeRate();
    }, []);

    function handleFirstCurrency(data) {
        //console.log('handleFirstCurrency', data);
        console.log('getRatesSetToInputCurrency', getRatesSetToInputCurrency(dataTable, data.label));
        const activeSelectData = getRatesSetToInputCurrency(dataTable, data.label);
        setInputCurrencyCustomRateTable(activeSelectData);
    }

    useEffect (() => {


    }, [inputCurrencyCustomRateTable]);


    function handleTargetCurrencies(data) {
        console.log('data ', data);
        console.log('inputCurrencyCustomRateTable', inputCurrencyCustomRateTable);

        const updatedTargetCurrencies = data.map(currencyInfo => {
            console.log('currencyInfo.label ', currencyInfo.label );
            const targetCurrenciesTable = getOutputCurrencyRates(inputCurrencyCustomRateTable, currencyInfo.label)
            return targetCurrenciesTable[0];
        });
        console.log('updatedTargetCurrencies ', updatedTargetCurrencies);

        setTargetCurrencies(updatedTargetCurrencies);


        // data.forEach(currencyInfo => {
        //     console.log('currencyInfo.label ', currencyInfo.label );
        //     const activeOutputSelectData = getOutputCurrencyRates(inputCurrencyCustomRateTable, currencyInfo.label);
        //     setTargetCurrencies(activeOutputSelectData);
        //     console.log('activeOutputSelectData', activeOutputSelectData);
        // })

    }

    console.log('targetCurrencies', targetCurrencies);


    const convertValue = () => {
        // console.log('firstCurrency : ', firstCurrency);
        // console.log('targetCurrencies : ', targetCurrencies);
        // console.log('defaultFirstCurrency : ', defaultFirstCurrency);
        // console.log('defaultTargetCurrenciesKey : ', defaultTargetCurrenciesKey);

        let resultText = '';
        console.log(defaultTargetCurrency);

        targetCurrencies.forEach(currency => {
            resultText += `<p> la valeur convertie en <strong> ${currency.label }</strong> est ${(inputValue * currency.rate).toFixed(2) }</p> <br/> `
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
                        defaultValue={defaultFirstCurrency}
                        value={firstCurrency}
                        onChange={handleFirstCurrency}
                        autoFocus={true}
                    />

                </div>
                <span style={{display: 'block', height: '1rem'}}></span>
                
                <input type="number" defaultValue={''} placeholder="Entrez le montant à convertir" onChange={handleInputChange} style={{width: '12rem', border: '1px solid lightGray', padding: '0.5rem', borderRadius: '4px'}}/>

                <h3>À convertir en :</h3>
                <div style={{ width: 'fit-content'}}>

                        <Select
                            isMulti
                            options={rateSelectOption}
                            defaultValue={defaultTargetCurrency}
                            //value={targetCurrencies}
                            onChange={handleTargetCurrencies}
                            autoFocus={true}
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