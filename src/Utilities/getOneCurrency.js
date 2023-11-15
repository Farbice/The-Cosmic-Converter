/**
     * This function filters out a table and extract all information of one currency
     * @param {array} table - The rates tables initialized with the input currency value to 1.00
     * @param {string} currencyLabel - the currency label for filtering
     * @returns {object} - all information of one currency to be converted to
     */
const getOneCurrency = (table, currencyLabel) => {

    const outputCurrencyRate = table.filter((currency) => currency.label === currencyLabel);
    return outputCurrencyRate;

}

export default getOneCurrency;