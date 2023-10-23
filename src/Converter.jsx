import { useState, useEffect } from "react";
import Select from 'react-select';

function customizeRates (ratesTable, targetRate ) {
    const rateEntries = Object.entries(ratesTable);
    const rateArray = rateEntries.map(([currency, rate]) => {
        let test = 
        {
            currency: currency,
            rate: parseFloat(rate / ratesTable[targetRate]).toFixed(4),
        }
        return test;
    }
    );
}

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

    useEffect(() => {
        async function fetchExchangeRate() {
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                customizeRates(data.rates, 'AED');
                const currKeys = showCurrency(data.rates);
                setSelectedCurrency(currKeys);
            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }
        fetchExchangeRate();
    }, []);

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

    return (
        <form>
            <h3>Conversion en dollar (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.euroAmount} onChange={(e) => handleChange(e, 'euroAmount')} /> €
            <p>{currencyValue.dollarAmount} $</p>
            <h3>Conversion en euros (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.dollarAmount} onChange={(e) => handleChange(e, 'dollarAmount')} /> $
            <p>{currencyValue.euroAmount} €</p>
            <select name="selectCurrency" id="selectCurrency" value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
                {
                    selectedCurrency.map(key => <option value={key}>{key}</option>)
                }
            </select>
            <Select
                options={selectedCurrency.map(key => <option value={key}>{key}</option>)}
            />

        </form>

    );
}

export default Converter;