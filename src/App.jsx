import { useState } from 'react';
import Intro from './Intro.jsx';
import Count from './Count.jsx';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  }

  const [value, setValue] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  console.log('render');

  return <>
    {/* <Intro /> */}
    {/* <Count /> */}
    <form onSubmit={handleSubmit}>
      <h3>Entrez votre montant à convertir</h3>
      <input type='text' name='firstname' value={value} onChange={handleChange}/> €
      <button>Convertir en US Dollar</button>
      {value * 1.05}
    </form>
  </>
}

export default App
