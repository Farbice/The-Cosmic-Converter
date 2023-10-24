import { useState, useEffect } from "react";
import Select from 'react-select';



function showCurrency (ratesTable) {
    const currencyKeys = Object.keys(ratesTable);
    return currencyKeys;
}


function Converter() {
    const [currencyValue, setCurrencyValues] = useState({
        euroAmount: '',
        dollarAmount: ''
    });

    const [rates, setRate] = useState({
        eurToDollarRate: '',
        dollarToEurRate: ''
    });

    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [rateSelectOption, setRateSelectOption] = useState([]);
    const [defaultCurrencyKey, setDefaultCurrencyKey] = useState({});
    const [selectedOptionsA, setSelectedOptionsA] = useState({ label:'hello', value:'jk'});


    const customizeRates = (ratesTable, targetRate) => {
        const rateEntries = Object.entries(ratesTable);
        const rateArray = rateEntries.map(([currency, rate]) => {
            return {
                currency: currency,
                value: currency,
                label: currency,
                rate: parseFloat(rate / ratesTable[targetRate]).toFixed(4),
            }
        });
    
        const defaultRate = rateArray.filter((e) => e.currency == targetRate);
        setDefaultCurrencyKey(defaultRate);
        setSelectedOptionsA(defaultRate.label);
    
        return rateArray;
    }

    useEffect(() => {
        async function fetchExchangeRate() {
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                const selectData = customizeRates(data.rates, 'EUR');
                const currKeys = showCurrency(data.rates);
                setSelectedCurrency(currKeys); 
                setRateSelectOption(selectData);
    
            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }
        fetchExchangeRate();
    }, []);

    useEffect(() => console.log('selectA value : ' + selectedOptionsA), [selectedOptionsA]);

    const handleChange = (e, currency) => {
        let updatedValue;
        switch (currency) {
            case 'euroAmount':
                updatedValue = (parseFloat(e.target.value) * rates.eurToDollarRate).toFixed(2);
                setCurrencyValues({ ...currencyValue, euroAmount: updatedValue });
                break;
            case 'dollarAmount':
                updatedValue = (parseFloat(e.target.value) * 1/rates.eurToDollarRate).toFixed(2);
                setCurrencyValues({ ...currencyValue, dollarAmount: updatedValue });
                break;
            default:
                break;
        }
    };

    function handleSelect(data) {
        console.log(data);
        setSelectedOptionsA(data);
      }

    return (
        <form>
            <h3>Conversion en dollar (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.euroAmount} onChange={(e) => handleChange(e, 'euroAmount')} /> €
            <p>{currencyValue.dollarAmount} $</p>
            <h3>Conversion en euros (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.dollarAmount} onChange={(e) => handleChange(e, 'dollarAmount')} /> $
            <p>{currencyValue.euroAmount} €</p>
            {/* <select name="selectCurrency" id="selectCurrency" value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
                {
                    selectedCurrency.map((key, index) => <option key={index} value={key}>{key}</option>)
                }
            </select> */}


<div style={{ width: '120px'}}>

       {
                    (rateSelectOption.length > 0) &&  <Select
                        options={rateSelectOption}
                        defaultValue={defaultCurrencyKey}
                        value={selectedOptionsA}
                        onChange={handleSelect}
                    />
            }
</div>
         
        </form>
    );
}

export default Converter;