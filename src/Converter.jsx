import { useState, useEffect } from "react";
import Select from 'react-select';



function showCurrency (ratesTable) {
    const currencyKeys = Object.keys(ratesTable);
    return currencyKeys;
}


function Converter() {

    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [rateSelectOption, setRateSelectOption] = useState([]);
    const [defaultCurrencyKeyA, setDefaultCurrencyKeyA] = useState({});
    const [defaultCurrencyKeyB, setDefaultCurrencyKeyB] = useState({});
    const [selectedOptionsA, setSelectedOptionsA] = useState({});
    const [selectedOptionsB, setSelectedOptionsB] = useState({});


    const customizeRates = (ratesTable, targetRate, targetInput) => {
        const rateEntries = Object.entries(ratesTable);
        const rateArray = rateEntries.map(([currency, rate]) => {
            return {
                currency: currency,
                value: currency,
                label: currency,
                rate: parseFloat(rate / ratesTable[targetRate]).toFixed(4)
            }
        });
        
        if(targetInput === 'currencyA') {
            const defaultRateA = rateArray.filter((e) => e.currency == targetRate);
            setDefaultCurrencyKeyA(defaultRateA);
            setSelectedOptionsA(defaultRateA.label);
        } else if(targetInput === 'currencyB') {
            const defaultRateB = rateArray.filter((e) => e.currency == targetRate);
            setDefaultCurrencyKeyB(defaultRateB);
            setSelectedOptionsB(defaultRateB.label);
        }

        
    
        return rateArray;
    }

    useEffect(() => {
        async function fetchExchangeRate() {
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                const selectDataA = customizeRates(data.rates, 'EUR', 'currencyA');
                const selectDataB = customizeRates(data.rates, 'USD', 'currencyB');
                const currKeys = showCurrency(data.rates);
                setSelectedCurrency(currKeys); 
                setRateSelectOption(selectDataA);
                setRateSelectOption(selectDataB);
    
            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }
        fetchExchangeRate();
    }, []);

    useEffect(() => console.log('selectA value : ' + selectedOptionsA), [selectedOptionsA]);

    function handleSelectA(data) {
        console.log(data);
        setSelectedOptionsA(data);
    }

    function handleSelectB(data) {
        console.log(data);
        setSelectedOptionsB(data);
    }

    return (
        <form>
            <div style={{ width: '120px'}}>

                {
                    (rateSelectOption.length > 0) &&  <Select
                        options={rateSelectOption}
                        defaultValue={defaultCurrencyKeyA}
                        value={selectedOptionsA}
                        onChange={handleSelectA}
                    />
                }
            </div>
            <div style={{ width: '120px'}}>

                {
                    (rateSelectOption.length > 0) &&  <Select
                        options={rateSelectOption}
                        defaultValue={defaultCurrencyKeyB}
                        value={selectedOptionsB}
                        onChange={handleSelectB}
                    />
                }
            </div>
        </form>
    );
}

export default Converter;