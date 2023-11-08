import { useState, useEffect } from "react";
import { render } from "react-dom";
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
    const [selectedOptionsA, setSelectedOptionsA] = useState({
        currency: 'EUR',
        value: 'EUR',
        label: 'EUR',
        rate: 1
    });
    const [selectedOptionsB, setSelectedOptionsB] = useState({
        currency: 'USD',
        value: 'USD',
        label: 'USD',
        rate: 1.05
    });

    


    const [showConvert, setShowConvert] = useState ('');
    const [inputValue, setInputValue] = useState('')


    /** 
     *  This function updates rates according to a chosen currency label
     * @param ratesTable - The rates tables from the fetch api
     * @param targetRate - currency to set by default
     * @param targetInput - A string to choose between input or output currency
     * @return {array} - array of all rates values with target rate set to 1
    */


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
            console.log('defaultRateA : ', defaultRateA);
            setDefaultCurrencyKeyA(defaultRateA);
            setSelectedOptionsA(defaultRateA.label);
            //console.log('selectedOptionsA : ', selectedOptionsA);
        } else if(targetInput === 'currencyB') {
            const defaultRateB = rateArray.filter((e) => e.currency == targetRate);
            console.log('defaultRateB : ', defaultRateB);
            setDefaultCurrencyKeyB(defaultRateB);
            setSelectedOptionsB(defaultRateB.label);
            //console.log('selectedOptionsB : ', selectedOptionsB);
        }

        
        return rateArray;
    }

    useEffect(() => {

        async function fetchExchangeRate() {

            
            try {
                const response = await fetch('https://cdn.taux.live/api/latest.json');
                const data = await response.json();

                console.log('MACO');
                const selectDataA = customizeRates(data.rates, 'EUR', 'currencyA');
                const selectDataB = customizeRates(data.rates, 'USD', 'currencyB');
                const currKeys = showCurrency(data.rates);
                //setSelectedCurrency(currKeys);
                setRateSelectOption(selectDataA);
                setRateSelectOption(selectDataB);
    
            } catch (error) {
                console.error('Erreur lors de la récupération des taux de change :', error);
            }
        }
        console.log('selectedCurrency ', selectedCurrency);
        if(selectedCurrency.length < 1) fetchExchangeRate();
    }, []);


    function handleSelectA(data) {
        //console.log(data);
        setSelectedOptionsA(data);
    }

    console.log('selectedOptionsA : ', selectedOptionsA);
    console.log('selectedOptionsB : ', selectedOptionsB);

    function handleSelectB(data) {
        //console.log(data);
        setSelectedOptionsB(data);
    }


    const convertValue = (value) => {
        const result = value * 5.9898
        setShowConvert(`<p> la valeur convertie est ${result}</p> `);
        return result
    }


    function handleSubmit(e) {
        e.preventDefault();
    };

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    //console.log(inputValue);

    return (
        <form onSubmit={handleSubmit}>
            <h3>Devise initiale :</h3>
            <div style={{ width: '120px'}}>

                {
                    (rateSelectOption.length > 0) && <Select
                        options={rateSelectOption}
                        defaultValue={[defaultCurrencyKeyA]}
                        value={[selectedOptionsA]}
                        onChange={handleSelectA}
                        autoFocus={true}
                    />
                }

            </div>
            <span style={{display: 'block', height: '1rem'}}></span>
            
            <input type="number" defaultValue={''} placeholder="Entrez le montant à convertir" onChange={handleChange} style={{width: 'fit-content', border: '1px solid lightGray', padding: '0.5rem', borderRadius: '4px'}}/>

            <h3>À convertir en :</h3>
            <div style={{ width: 'fit-content'}}>

                {
                    (rateSelectOption.length > 0) && <Select
                        isMulti
                        options={rateSelectOption}
                        defaultValue={[defaultCurrencyKeyB]}
                        value={[selectedOptionsB]}
                        onChange={handleSelectB}
                        autoFocus={true}
                    />
                }

            </div>
            <span style={{display: 'block', height: '1rem'}}></span>
            <div>
                <button onClick={() => convertValue(inputValue)}>Convertir</button>
            </div>
            {/* <div dangerouslySetInnerHTML={{__html: showConvert}}>
                
            </div> */}
        </form>
    )
}

export default Converter;