const splitNumber = (initialNumber) => {

    let splittedNumber = []; 
    if (initialNumber.includes('.')){
        splittedNumber = initialNumber.toString().split('.');
    } else if (initialNumber.includes(',')) {
        splittedNumber = initialNumber.toString().split(',');
    } 
    return splittedNumber;

}

export default splitNumber;