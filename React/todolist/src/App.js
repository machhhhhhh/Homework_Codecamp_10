import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

function App() {

  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [done, setDone] = useState([])

  // this algorithm not support for same words
  const finish = index =>{
    // const data = ([...list].splice(index,1));
    // setList(data)
    // const data = [...list].filter(item => item !== todo)
    // const move = [...list].filter(item => item === todo)
    // setList(data)
    
    // if(move.length > 1){
    //   setDone([move[0],...done])
    // } 
    // else {
    //   setDone([move,...done])
    // }

    const data = [...list]
    const move = data.splice(index,1)
    setDone([move,...done])
    setList(data)

  }

  const add = () => {
    if (text) 
    setList([...list, text])
    setText("")
    // console.log(list.length);
  }

  const del = index => {
    // const data = [...list].filter(list => list !== item)
    // setList(data)
    // list.splice(index,1)
    const data = [...list]
    data.splice(index,1)
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
            <Button variant="contained" color="success"  onClick={() => finish(key)}><CheckIcon/></Button>
            <Button variant="contained" color="error" onClick={() => del(key)}><DeleteIcon /></Button>
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
