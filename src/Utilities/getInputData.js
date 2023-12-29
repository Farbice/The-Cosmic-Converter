const getInputData = (inputValue, inputCurrency) => {

    if(inputValue !== '') {

        let inputDataTable = {
            amount: '',
            currency: ''
        };

        inputDataTable.amount = inputValue;
        inputDataTable.currency = inputCurrency;

        console.log(inputDataTable);

        return inputDataTable;
    }
};

export default getInputData;