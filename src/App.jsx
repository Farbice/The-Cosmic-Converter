import { useReducer, useRef, useState, useEffect } from 'react';
import Intro from './Intro.jsx';
import Count from './Count.jsx';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  }

  const [currencyValues, setCurrencyValues] = useState({
    euroAmount: '',
    dollarAmount: ''
  });



  const [dollarValue, setDollarValue] = useState('');
  const [euroValue, setEuroValue] = useState('');

  const dollarRef = useRef('');
  //console.log(dollarRef.current);

  const euroRef = useRef('');
  //console.log(euroRef.current);

  // useEffect(()=> {
  //   setEuroValue(updatedValue *  0.95);
  //   setDollarValue(euroValue * 1.05)

  // }, [dollarValue, euroValue])

  const handleChange = (e, currency) => {
    //console.log(currency, e.target);
    // console.log(e.target.value);
    let updatedValue = 0;

    switch (currency) {
      case 'dollars':
        updatedValue = parseFloat(e.target.value * 1.05).toFixed(2);
        setTimeout(() => {
          setEuroValue(updatedValue);
          
        }, 500);
        break;
      case 'euros':
        updatedValue = parseFloat(e.target.value * 0.95).toFixed(2);
        setTimeout(() => {
          setDollarValue(updatedValue);
          
        }, 500);
        break;
      default:
        break;
    }
  }

  const handleInput = (e, refName) => {
    console.log(refName);
    
    let updatedInputValue;

    switch (refName) {
      case 'dollarRef':
        
        console.log('here in dollarRef');
        // console.log('dolls: ', updatedValue);
        break;
      case 'euroRef':

        console.log('here in euroRef');
        // console.log('euros: ', updatedValue);
        break;
      default:
        break;
    }

  }


  //console.log('render');

  return <>
    {/* <Intro /> */}
    {/* <Count /> */}
    <form onSubmit={handleSubmit}>
      <h3>Entrez le montant à convertir</h3>
      <input type='number' name='euroAmount' defaultValue={dollarValue} ref={euroRef} onInput={(e) => { handleChange(e, 'dollars'); handleInput(e, 'dollarRef')} } /> €
      <br></br>
      {dollarValue}
      <br></br>
      <input type='number' name='dollarAmount' defaultValue={euroValue} ref={dollarRef} onInput={(e) => { handleChange(e, 'euros'); handleInput(e, 'euroRef')} } /> $
      <br></br>
      {euroValue}
      <br></br>
    </form>
  </>
}

export default App
