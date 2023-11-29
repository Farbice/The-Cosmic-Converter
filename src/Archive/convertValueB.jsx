// const convertValue = (inputRefValue, inputValue, targetCurrencies, outputCurrentData, setShowConvert, setShowAmountErrorMessage, setShowCurrencyErrorMessage) => {

//     if(!inputRefValue == ''){

//         let resultText = '';
//         let resultTable = [];
//         let resultObject = {
//             value: '',
//             label: ''
//         };

//         targetCurrencies.forEach(currency => {
//             resultText += `<p> ${(inputValue * currency.rate).toFixed(3)} <strong>${currency.label}</strong> </p><br/> `;
//             resultObject.value = (inputValue * currency.rate).toFixed(3);
//             resultObject.label = currency.label;
//             resultTable.push({value: resultObject.value, label: resultObject.label});
//         });

//         setShowConvert(resultText);

//         console.log('resultTable : ', resultTable);
//         return resultTable

//     } else {

//         setShowAmountErrorMessage(true);

//     }

//     let outputSelectValue = outputCurrentData;
//     if(outputSelectValue.length === 0) {
//         setShowCurrencyErrorMessage(true);
//     }

// }

// export default convertValue;