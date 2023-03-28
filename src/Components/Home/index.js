// Import required libraries and components
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallet from '../Wallets';
import Transfer from '../Transfer';
import Sidebar from '../Sidebar';
import './style.css';
import WalletDetails from '../wallet';

// Define a functional component named 'Home'
const Home = () => {
  // Use the 'useEffect' hook to perform side effects (e.g. fetching data) after the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch cryptocurrency prices
    const fetchPrices = async () => {
      // Fetch data from the Coingecko API
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple&vs_currencies=usd');
      // Extract the price data from the response
      const prices = await response.json();
      // Update the component state with the extracted prices
      setPrices({
        bitcoin: prices.bitcoin.usd,
        ethereum: prices.ethereum.usd,
        ripple: prices.ripple.usd
      });
      // Retrieve stored wallet data from local storage (if available)
      const storedWallets = JSON.parse(localStorage.getItem('wallets'));
      // If stored wallet data is available, update the component state with it
      if (storedWallets && storedWallets.length > 0) {
        SetWallet(storedWallets);
      } else {
        // If no stored wallet data is available, initialize the component state with a default wallet
        
      }
    };
    // Call the 'fetchPrices' function to fetch cryptocurrency prices and update the component state
    fetchPrices();

    // Pass an empty array as the second argument to the 'useEffect' hook to ensure that it only runs once
  }, []);

  // Define component state using the 'useState' hook
  const [wallets, SetWallet] = useState([]);
  const [prices, SetPrices] = useState({
    bitcoin: 0,
    ethereum: 0,
    ripple: 0,
  });

  // Define a function to update the component state with new wallet data
  const setWallet = (wallets) => {
    SetWallet(wallets);
  };

  // Define a function to update the component state with new cryptocurrency price data
  const setPrices = (cryptoPrices) => {
    SetPrices(cryptoPrices);
  };

  // Return the JSX for the 'Home' component
  return (
    <nav className="navbar_container" >
      <div className="nav_section_2">
        <div className='user_info_container'>
          <div className='balance_info'>
             TOTAL WALLETS:   {wallets.length}
          </div>
          <div className='user_info'>
            <img src="/images/user.png" alt="" />
            <p>
              Welcome Back <br />
              User Name
            </p>
          </div>
          
        </div>
      </div>
      <div className="nav_section_1">
        <Sidebar />
      </div>

      <div className="nav_section_3">
        <Routes>
          <Route exact path="/crypto_wallet_test/" element={<Wallet setWallet={setWallet} wallets={wallets} prices={prices} />} />
          <Route exact path="/crypto_wallet_test/transfer" element={<Transfer />} />
          <Route exact path="/crypto_wallet_test/wallet/:id" element={<WalletDetails wallets={wallets} prices={prices} setWallet={setWallet}/>} />
        </Routes>
      </div>
    </nav>
  );
};

export default Home;
