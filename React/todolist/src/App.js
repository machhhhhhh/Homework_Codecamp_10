import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';
import './App.css';


function App() {

  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [done, setDone] = useState([])

  // this algorithm not support for same words
  const finish = todo =>{
    // const data = ([...list].splice(index,1));
    // setList(data)
    let text =''
    const data = [...list].filter(item => item !== todo)
    const move = [...list].filter(item => item === todo)
    setList(data)
    
    if(move.length > 1){
      setDone([move[0],...done])
    } 
    else {
      setDone([move,...done])
    }
  }

  const add = () => {
    if (text) 
    setList([...list, text])
    setText("")
    // console.log(list.length);
  }

  const del = todo => {
    const data = [...list].filter(item => item !==todo)
    setList(data)
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      
      <input placeholder='Enter list' value= {text} onChange={ e => setText(e.target.value)}/> 
      <button onClick={add} >ADD</button>

      {/* {(list.length== 0)? 
        <h1>No Lists found!!</h1> 
      : 
        <div>
          <h1>The Lists</h1>
          {list.map((item, key) => {
            <h3>{item}</h3>

          })}
          <button>Delete</button>
        </div>
      } */}

      <div className='item'>
        <h1>Lists</h1>
        {list.map((item,key) => 
          <li key={key} >
            {item}
            <button onClick={() => finish(item)}>Finish</button>
            <button onClick={() => del(item)}>Del</button>
          </li>
        )}
      </div>

      <div className='done'>
        <h1>Done</h1>
        {done.map((item,key) => 
          <li key={key} >
            {item}
          </li>
        )}
      </div>

    </div>
  );
}

export default App;
