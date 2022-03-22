import React from 'react';
import {BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Page/Home'
import About from './components/Page/About'
import Topic from './components/Page/Toppic';
import Greeting from './components/Page/Greeting';

function App() {

  return (
    <>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          <Route path="/topic" exact component={Topic}/>
          <Route path= "/greeting/:name" exact component={Greeting}/>
        </Switch>
    </>
  );
}
export default App;
