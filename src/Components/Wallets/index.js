import React, { useState, useEffect } from 'react'
import { BiWallet, BiCopy } from 'react-icons/bi'
import './style.css';
import { IconContext } from "react-icons";

function Wallet(props) {

  const [wallet, setWallet] = useState({
    wallet_1: {
      name: 'Wallet 1',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      crypto_balance: {
        bitcoin: 1.345,
        ethereum: 11.342,
        ripple: 104.567
      },
      balance: 0,
    }
  });

  const [prices, SetPrices] = useState({
    bitcoin: 0,
    ethereum: 0,
    ripple: 0,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple&vs_currencies=usd');
      const prices = await response.json();
      SetPrices({
        bitcoin: prices.bitcoin.usd,
        ethereum: prices.ethereum.usd,
        ripple: prices.ripple.usd
      })
      props.SetTotalBalance((wallet.wallet_1.crypto_balance.bitcoin * prices.bitcoin.usd) + (wallet.wallet_1.crypto_balance.ethereum * prices.ethereum.usd) + (wallet.wallet_1.crypto_balance.ripple * prices.ripple.usd))
    };

    fetchPrices()

  }, []);

  // const handleBuy = (crypto) => {
  //   setWallet(prevState => ({
  //     ...prevState,
  //     [crypto]: prevState[crypto] + 1
  //   }));
  // };

  // const handleSell = (crypto) => {
  //   if (wallet[crypto] > 0) {
  //     setWallet(prevState => ({
  //       ...prevState,
  //       [crypto]: prevState[crypto] - 1
  //     }));
  //   }
  // };

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
      <h1><BiWallet /> My Crypto Wallet</h1>
      <div className='wallet_card_container'>


        <div className="card_container">
          <div className="wrapper">
            <div className="banner-image-bitcoin"> </div>
            <h2>{wallet.wallet_1.name}</h2>
            <p>balance {((wallet.wallet_1.crypto_balance.bitcoin * prices.bitcoin) + (wallet.wallet_1.crypto_balance.ethereum * prices.ethereum) + (wallet.wallet_1.crypto_balance.ripple * prices.ripple)).toFixed(2)}</p>
            <div className='wallet_url'>
              <p>{wallet.wallet_1.address}</p>
              <IconContext.Provider value={{ color: 'white' }}>
                <button onClick={() => copyToClipboard(wallet.wallet_1.address)}><BiCopy /></button>
              </IconContext.Provider>
            </div>
          </div>
        </div>

        {/* <div className="card_container">
          <div className="wrapper">
            <div className="banner-image-ethereum"> </div>
            <h2>Ethereum Wallet</h2>
            <p>Amount {wallet.ethereum.toFixed(2)}</p>
            <p>Value (USD) {(wallet.ethereum * wallet.ethereumPrice).toFixed(2)}</p>
            <div className='wallet_url'>
              <p>1A1zP1eP5QGefi2D...</p>
              <p><BiCopy/></p>
            </div>
          </div>
        </div>

        <div className="card_container">
          <div className="wrapper">
            <div className="banner-image-ripple"> </div>
            <h2>Ripple Wallet</h2>
            <p>Amount {wallet.ripple.toFixed(2)}</p>
            <p>Value (USD) {(wallet.ripple * wallet.ripplePrice).toFixed(2)}</p>
            <div className='wallet_url'>
              <p>1A1zP1eP5QGefi2D...</p>
              <p><BiCopy/></p>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}



export default Wallet