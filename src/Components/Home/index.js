import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Wallet from '../Wallets';
import Transfer from '../Transfer'
import Sidebar from '../Sidebar';
import './style.css'

const Home = () => {

  const [balance, SetBalance] = useState(4);
  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, []);

  const SetTotalBalance = (totalBalance) => {
    SetBalance(totalBalance)
    localStorage.setItem('balance', JSON.stringify(totalBalance));
  }
  

  return (
    <nav className="navbar_container" >
      <div className="nav_section_2">
        <div className='user_info_container'>
          <div className='balance_info'>
            <p>
              Total Balance
            </p>
            <h3>{balance.toFixed(3)} USD</h3>
          </div>
          <div className='user_info'>
            <img src="/images/user.png" alt="" />
            <p>
              Welcome Back <br />
              Bruno Cami
            </p>
          </div>
        </div>
      </div>
      <div className="nav_section_1">
        <Sidebar />
      </div>

      <div className="nav_section_3">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/myWallet" element={<Wallet SetTotalBalance={SetTotalBalance}/>} />
          <Route exact path="/transfer" element={<Transfer />} />
        </Routes>
      </div>
    </nav>
  );
};

export default Home;
