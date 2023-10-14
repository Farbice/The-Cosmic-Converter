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
      <input type='text' name='firstname' value={value} onChange={handleChange}/>
      {value}
      <button>Envoyer</button>
    </form>
  </>
}

export default App
