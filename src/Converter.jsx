import { useState, useEffect } from "react";

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


function Converter() {
    const [currencyValue, setCurrencyValues] = useState({
        euroAmount: '',
        dollarAmount: ''
    });

    const [rates, setRate] = useState({
        eurToDollarRate: '',
        dollarToEurRate: ''
    });

    useEffect(() => {
        async function fetchExchangeRate() {
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();
                customizeRates(data.rates, 'AED');
                
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

    const [selectCurrency, setSelectCurrency] = useState({
        
    });

    return (
        <form>
            <h3>Conversion en dollar (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.euroAmount} onChange={(e) => handleChange(e, 'euroAmount')} /> €
            <p>{currencyValue.dollarAmount} $</p>
            <h3>Conversion en euros (avec useEffect)</h3>
            <input type="number" defaultValue={currencyValue.dollarAmount} onChange={(e) => handleChange(e, 'dollarAmount')} /> $
            <p>{currencyValue.euroAmount} €</p>
            <select name="selectCurrency" id="selectCurrency">
                <option value="euros">{selectCurrency}</option>
                <option value="dollars">{selectCurrency}</option>
            </select>
        </form>

    );
}

export default Converter;