import React, { useState, useEffect } from 'react'
import { BiWallet, BiCopy } from 'react-icons/bi'
import './style.css';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

function Wallet(props) {

  const updateLocalStorage = (wallets) => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  };

  function generateAddress() {
    const chars = '0123456789abcdef';
    let address = '';
    for (let i = 0; i < 40; i++) {
      const index = Math.floor(Math.random() * chars.length);
      address += chars[index];
    }
    return address;
  }

  function addNewWallet() {
    const newWallet = {
      name: `Wallet ${props.wallets.length + 1}`,
      id: props.wallets.length + '1',
      address: generateAddress(),
      crypto_balance: {},
      balance: 1000
    };
    props.setWallet(prevState => [...prevState, newWallet]);
    // Save wallet to localStorage
    updateLocalStorage([...props.wallets, newWallet]);
  }

  function deleteWallet(index) {
    const updatedWallets = [...props.wallets];
    updatedWallets.splice(index, 1);
    props.setWallet(prevState => prevState.filter((_, i) => i !== index));
    updateLocalStorage(updatedWallets);

  }

  const copyToClipboard = (text) => {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Text has been copied to clipboard!');
  };



  return (
    <div className='wallet_container'>
      <div className='wallet_title_container'>

        <h1><BiWallet /> My Crypto Wallet</h1>
        <button className='button-80' onClick={addNewWallet}>Create Wallet + </button>
      </div>
      <div className='wallet_card_container'>


        {props.wallets.map((wallet, index) => (
          <div className="card_container" key={index}>
            <div className="wrapper">
              <div className="banner-image-bitcoin"> </div>
              <h2>{wallet.name}</h2>
              <div className='wallet_url'>
                <p>{wallet.address}</p>
                <IconContext.Provider value={{ color: 'white' }}>
                  <button onClick={() => copyToClipboard(wallet.address)}><BiCopy /></button>
                </IconContext.Provider>
              </div>
            </div>

            <div className="button-wrapper">
              <button className="btn fill" ><Link to={`/wallet/${wallet.id}`}>DETAIL</Link></button>
              <button className="btn outline" onClick={() => deleteWallet(index)}>DELETE</button>
            </div>
          </div>
        ))}





      </div>
    </div>
  );
}



export default Wallet