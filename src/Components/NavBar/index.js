import React from 'react';
import './style.css'
import { DiBrackets } from "react-icons/di";
import { IconContext } from "react-icons";

const Navbar = () => {
  return (
    <nav className="navbar_container" >
      <div className="nav_section_2">
        <div className='user_info_container'>
          <div className='balance_info'>
            <p>
              Total Balance
            </p>
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
        <IconContext.Provider value={{ size: '50px' }}>
          <div className='logo'>
            <DiBrackets />
          </div>
        </IconContext.Provider>
        <ul className='nav_section_list'>
          <li>Dashboard</li>
          <li>My Wallet</li>
          <li>Transfer</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
