import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Home from './Components/Home';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" component={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
