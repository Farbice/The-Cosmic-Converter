import { useState} from 'react';
import Intro from './Intro.jsx';
import Count from './Count.jsx';
import Converter from './Converter.jsx';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
        updatedValue = parseFloat(e.target.value * 1.05).toFixed(2);
        setEuroValue(updatedValue);
          
        break;
      case 'euros':
        updatedValue = parseFloat(e.target.value * 0.95).toFixed(2);
        setDollarValue(updatedValue);
        break;
      default:
        break;
    }
  }


  return <>
    {/* <Intro /> */}
    {/* <Count /> */}
    
    <form onSubmit={handleSubmit}>
      <h3>Entrez le montant à convertir</h3>
      <input type='number' name='euroAmount' defaultValue={dollarValue} onInput={(e) => { handleChange(e, 'dollars')} } /> €
      <br></br>
      {dollarValue}
      <br></br>
      <input type='number' name='dollarAmount' defaultValue={euroValue} onInput={(e) => { handleChange(e, 'euros')} } /> $
      <br></br>
      {euroValue}
      <br></br>
    </form>

    <Converter />
  </>
}

export default App
