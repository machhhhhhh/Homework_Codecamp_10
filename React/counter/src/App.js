import './App.css';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0)


  return (
    <div className="App">
          Number : {count}
          <hr></hr>
          <button onClick={()=> setCount(count+1)}>Up</button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <button onClick={()=>setCount(count-1)}>Down</button>
    </div>
  );
}

export default App;
