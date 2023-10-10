import { useState } from 'react';
import Intro from './Intro.jsx';
import Count from './Count.jsx';

function App() {

  const [firstname, setFristname] = useState('John doe')

  return <>
    {/* <Intro /> */}
    {/* <Count /> */}
    <form>
      <input type='text' name='firstname'/>
    </form>
  </>
}

export default App
