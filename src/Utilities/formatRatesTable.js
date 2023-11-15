/** 
     *  This function updates rates according to a chosen currency label
     * @param ratesTable - The rates tables from the fetch api
     * @param targetCurrency - currency to set by default
     * @return {array} - array of all rates values with target currency rate set to 1
    */
const formatRatesTable = (ratesTable, targetCurrency, setFirstCurrency) => {
    const rateEntries = Object.entries(ratesTable);
    const rateArray = rateEntries.map(([currency, rate]) => {
        return {
            currency: currency,
            value: currency,
            label: currency,
            rate: parseFloat(rate / ratesTable[targetCurrency]).toFixed(4)
        }
    });
    const defaultInputCurrency = rateArray.filter((currency) => currency.label === targetCurrency);

    setFirstCurrency(defaultInputCurrency);

    return rateArray;
}

export default formatRatesTable;