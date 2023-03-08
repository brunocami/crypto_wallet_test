import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';

const App = () => {

  return (
    <Router>
      <div>
        <Home/>
      </div>
    </Router>
  );
};

export default App;
