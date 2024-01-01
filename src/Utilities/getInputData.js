const getInputData = (inputValue, inputCurrency) => {

    if(inputValue !== '') {

        let inputDataTable = {
            amount: '',
            currency: ''
        };

        if (!(inputValue.includes(".") || inputValue.includes(","))) {

            inputDataTable.amount = inputValue + '.00';

        } else {

            inputDataTable.amount = inputValue;
        }

        inputDataTable.currency = inputCurrency;

        return inputDataTable;
    }
};

export default getInputData;