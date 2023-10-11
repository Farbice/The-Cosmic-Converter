import { useState } from 'react';
import Intro from './Intro.jsx';
import Count from './Count.jsx';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  }

  return <>
    {/* <Intro /> */}
    {/* <Count /> */}
    <form onSubmit={handleSubmit}>
      <input type='text' name='firstname'/>
      <button>Envoyer</button>
    </form>
  </>
}

export default App
