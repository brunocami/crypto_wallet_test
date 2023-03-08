import React, { useState, useEffect } from 'react'
import { BiWallet, BiCopy } from 'react-icons/bi'
import './style.css'

function Wallet() {

  const [wallet, setWallet] = useState({
    bitcoin: 0,
    ethereum: 0,
    ripple: 0
  });

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple&vs_currencies=usd');
      const prices = await response.json();
      setWallet(prevState => ({
        ...prevState,
        bitcoin: prevState.bitcoin + 0.5,
        ethereum: prevState.ethereum + 2,
        ripple: prevState.ripple + 500,
        bitcoinPrice: prices.bitcoin.usd,
        ethereumPrice: prices.ethereum.usd,
        ripplePrice: prices.ripple.usd
      }));
    };

    const intervalId = setInterval(fetchPrices, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBuy = (crypto) => {
    setWallet(prevState => ({
      ...prevState,
      [crypto]: prevState[crypto] + 1
    }));
  };

  const handleSell = (crypto) => {
    if (wallet[crypto] > 0) {
      setWallet(prevState => ({
        ...prevState,
        [crypto]: prevState[crypto] - 1
      }));
    }
  };

  return (
    <div className='wallet_container'>
      <h1><BiWallet/> My Crypto Wallet</h1>
      <div className='wallet_card_container'>


        <div className="card_container">
          <div className="wrapper">
            <div className="banner-image-bitcoin"> </div>
            <h2>Bitcoin Wallet</h2>
            <p>Amount {wallet.bitcoin.toFixed(2)}</p>
            <p>Value (USD) {(wallet.bitcoin * wallet.bitcoinPrice).toFixed(2)}</p>
            <div className='wallet_url'>
              <p>1A1zP1eP5QGefi2D...</p>
              <p><BiCopy/></p>
            </div>
          </div>
          {/* <div className="button-wrapper">
            <button className="btn fill" onClick={() => handleBuy('bitcoin')}>BUY</button>
            <button className="btn outline" onClick={() => handleSell('bitcoin')}>SELL</button>
          </div> */}
        </div>

        <div className="card_container">
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
          {/* <div className="button-wrapper">
            <button className="btn fill" onClick={() => handleBuy('ethereum')}>BUY</button>
            <button className="btn outline" onClick={() => handleSell('ethereum')}>SELL</button>
          </div> */}
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
          {/* <div className="button-wrapper">
            <button className="btn fill" onClick={() => handleBuy('ripple')}>BUY</button>
            <button className="btn outline" onClick={() => handleSell('ripple')}>SELL</button>
          </div> */}
        </div>

      </div>
    </div>
  );
}
// return (
//   <div >
//     <div className='wallet_text'>
//       <h1><BiWallet/>My Wallet</h1>
//     </div>     
//     <div className='wallet_card_container'>
//       <div className='wallet_card'></div>
//     </div>
//   </div>
// )


export default Wallet