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

    const [targetCurrencies, setTargetCurrencies] = useState(defaultTargetCurrenciesKey);


    const [showConvert, setShowConvert] = useState ('');
    const [inputValue, setInputValue] = useState('')


    /** 
     *  This function updates rates according to a chosen currency label
     * @param ratesTable - The rates tables from the fetch api
     * @param targetRate - currency to set by default
     * @param targetInput - A string to choose between input or output currency
     * @return {array} - array of all rates values with target rate set to 1
    */
    const customizeRates = (ratesTable, targetRate) => {
        const rateEntries = Object.entries(ratesTable);
        const rateArray = rateEntries.map(([currency, rate]) => {
            return {
                currency: currency,
                value: currency,
                label: currency,
                rate: parseFloat(rate / ratesTable[targetRate]).toFixed(4)
            }
        });
            const defaultRates = rateArray.filter((e) => e.currency == targetRate);
            setFirstCurrency(defaultRates);
            setTargetCurrencies(defaultRates);
        
        return rateArray;
    }

    useEffect(() => {

        async function fetchExchangeRate() {

            
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                const selectData = customizeRates(data.rates, 'EUR');
                setRateSelectOption(selectData);
            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }

        fetchExchangeRate();
    }, []);


    function handleFirstCurrency(data) {
        setFirstCurrency(data);
    }

    function handleTargetCurrencies(data) {
        setTargetCurrencies(data);
    }



    const convertValue = () => {
        console.log('firstCurrency : ', firstCurrency);
        console.log('targetCurrencies : ', targetCurrencies);
        console.log('defaultFirstCurrency : ', defaultFirstCurrency);
        console.log('defaultTargetCurrenciesKey : ', defaultTargetCurrenciesKey);

        let resultText = '';
            targetCurrencies.forEach(currency => {
            resultText += `<p> la valeur convertie en <strong> ${currency.label }</strong> est ${(inputValue * currency.rate).toFixed(2) }</p> <br/> `
        } );
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
                            defaultValue={defaultTargetCurrenciesKey}
                            value={targetCurrencies}
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