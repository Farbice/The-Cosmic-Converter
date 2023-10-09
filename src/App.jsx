import { useState } from 'react';
import Intro from './Intro.jsx';


function App() {

  const [count, setCount] = useState(0);

  const incrementNum = () => {
    setCount((c) => c + 1);
  };

  const [person, setPerson] = useState({
    firstName: 'Joe',
    lastName: 'Jo',
    age: 18
    }
  );

  const incrementAge = () => {
    setPerson({...person, age: person.age + 1});
  }


  return <>
    {/* <Intro /> */}
    <p>Compteur {count}</p>
    <button onClick={incrementNum}>Incrémenter</button>
    <p>Donnez un an de plus à {person.firstName}</p>
    <button onClick={incrementAge}>ajouter</button>
    <p>{person.firstName} à {person.age} ans</p>
  </>
}

export default App
