import './App.css';
import Home from './screens/Home';
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element= {<Home/>}></Route>
        <Route exact path="/login" element= {<Login/>}></Route>
      </Routes>
    </div>
    </Router>
  );
  
}

export default App;
