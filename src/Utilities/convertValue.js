const convertValue = (inputRefValue, inputValue, targetCurrencies, outputCurrentData, setShowConvert, setShowAmountErrorMessage, setShowCurrencyErrorMessage) => {

    if(!inputRefValue == ''){

        let resultText = '';

        targetCurrencies.forEach(currency => {
            resultText += `<p> ${(inputValue * currency.rate).toFixed(3)} <strong>${currency.label }</strong> </p><br/> `
        });
        setShowConvert(resultText);

    } else {

        setShowAmountErrorMessage(true);

    }

    let outputSelectValue = outputCurrentData;
    if(outputSelectValue.length === 0) {
        setShowCurrencyErrorMessage(true);
    }

}

export default convertValue;