import { useState, useEffect } from "react";


function ConverterLegacy() {
    const [currencyValue, setCurrencyValues] = useState({
        euroAmount: '',
        dollarAmount: ''
    });

    const [rates, setRate] = useState({
        eurToDollarRate: '',
        dollarToEurRate: ''
    });


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
            {/* <select name="selectCurrency" id="selectCurrency" value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
                {
                    selectedCurrency.map((key, index) => <option key={index} value={key}>{key}</option>)
                }
            </select> */}
        </form>
    );
}

export default ConverterLegacy;