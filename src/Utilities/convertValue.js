const convertValue = (inputRefValue, inputValue, targetCurrencies, targetCurrencyRef, setShowAmountErrorMessage, setShowCurrencyErrorMessage) => {

    if(inputRefValue !== ''){

        let resultObject = {
            value: '',
            label: ''
        };

        const tableLabel = ['Amount', 'currency'];
        let resultTable = { label: tableLabel, values: []};

        targetCurrencies.forEach(currency => {
            resultObject.value = (inputValue * currency.rate).toFixed(3);
            resultObject.label = currency.label;
            resultTable.values.push([resultObject.value, resultObject.label]);
        });

        if(targetCurrencyRef.length === 0) {

            setShowCurrencyErrorMessage(true);
    
        } else {

            return resultTable;
        }


    } else {

        setShowAmountErrorMessage(true);
        
        if(targetCurrencyRef.length === 0) {
            setShowCurrencyErrorMessage(true);
        }
    
    }
   

}

export default convertValue;