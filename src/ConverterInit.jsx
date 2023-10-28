import { useState} from 'react';

function ConverterInit() {

  const [currencyValues, setCurrencyValues] = useState({
    euroAmount: '',
    dollarAmount: ''
  });

  const [dollarValue, setDollarValue] = useState('');
  const [euroValue, setEuroValue] = useState('');

  const handleChange = (e, currency) => {

    let updatedValue = 0;

    switch (currency) {
      case 'dollars':
        console.log(e.target);
        if(e.target.value.length > 0.5) {
          //console.log('if eurovalue here');
          updatedValue = parseFloat(e.target.value * 1.05).toFixed(2);
          setEuroValue(updatedValue);
        } else if (e.target.value.length < 0.5) {
          //console.log('else if eurovalue here');
          setEuroValue('');
        }
          
        break;
      case 'euros':
        console.log(e.target);
        if(e.target.value.length > 0.5) {
          //console.log('if dollvalue here');
          updatedValue = parseFloat(e.target.value * 0.95).toFixed(2);
          setDollarValue(updatedValue);
        } else if (e.target.value.length < 0.5) {
          //console.log('else if dollvalue here');
          setDollarValue('');
        }
        break;
      default:
        break;
    }
  }


  return <>

    <form>
      <h3>Entrez le montant à convertir</h3>
      <input type='number' name='dollarAmount' defaultValue={euroValue} onInput={(e) => { handleChange(e, 'euros')} } /> $
      <br></br>
      {euroValue}
      <br></br>
      <input type='number' name='euroAmount' defaultValue={dollarValue} onInput={(e) => { handleChange(e, 'dollars')} } /> €
      <br></br>
      {dollarValue}
      <br></br>
      
    </form>

  </>
}

export default ConverterInit
