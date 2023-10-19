import React from "react";
import { Fragment } from "react";


//Interpolation
const title = 'Hello Universe';
const style = { color: 'tomato', backgroundColor: 'azure' };
//Logique conditionnelle
const showTitle = true;
//List
const todoList = [
    'download antigravity package',
    'build overcraft',
    'explore galaxy'
];


function Intro() {

    const handleClick = (e) => {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        alert('There have been a click here')
    };

    return <Fragment>
        {
            showTitle ?
                <h1 onClick={handleClick} id="title" className="title" style={style}>{title}</h1>
                : <h2>Default dimension</h2>
        }
        <SecondaryTitle color="brown" hidden id="main-sub-title" className="sub-title">First dimension</SecondaryTitle>
        <input type="text" />
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam consequatur nihil suscipit eum architecto. Perspiciatis dolor est tempora quasi maiores beatae illum dicta officiis, necessitatibus, ipsa iure incidunt blanditiis deserunt.
        </p>
        <ul>
            {/* {todoList.map(todo => (<li>{todo}</li>))} */}
            {todoList.map((todo, index) => (<li key={`todo-${index}`} >{todo}</li>))}
        </ul>
    </Fragment>
}


function SecondaryTitle({ color, hidden, ...props }) {
    // if (hidden) {
    //   return null
    // };
    return <h2 style={{ color: color }} {...props} />
}

export default Intro