import React, { useState, useEffect } from 'react'
import { BiWallet, BiCopy } from 'react-icons/bi'
import './style.css';
import { IconContext } from "react-icons";

function Wallet(props) {

  const [wallets, setWallet] = useState(JSON.parse(localStorage.getItem('wallets')) || [
    {
      name: 'Wallet 1',
      id: 1,
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      crypto_balance: {
        bitcoin: 1.345,
        ethereum: 11.342,
        ripple: 104.567
      },
      balance: 0,
    }
  ]);
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
      props.SetTotalBalance((wallets[0].crypto_balance.bitcoin * prices.bitcoin.usd) + (wallets[0].crypto_balance.ethereum * prices.ethereum.usd) + (wallets[0].crypto_balance.ripple * prices.ripple.usd))
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

  const updateLocalStorage = (wallets) => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  };

  function addNewWallet() {
    const newWallet = {
      name: `Wallet ${wallets.length + 1}`,
      id: wallets.length + 1,
      address: '',
      crypto_balance: {
        bitcoin: 0,
        ethereum: 0,
        ripple: 0
      },
      balance: 0
    };
    setWallet(prevState => [...prevState, newWallet]);
    // Save wallet to localStorage
    updateLocalStorage([...wallets, newWallet]);
  }

  function deleteWallet(index) {
    const updatedWallets = [...wallets];
    updatedWallets.splice(index, 1);
    setWallet(prevState => prevState.filter((_, i) => i !== index));
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
      <h1><BiWallet /> My Crypto Wallet</h1>
      <div className='wallet_card_container'>


        {wallets.map((wallet, index) => (
          <div className="card_container" key={index}>
            <div className="wrapper">
              <div className="banner-image-bitcoin"> </div>
              <h2>{wallet.name}</h2>
              <p>balance {((wallet.crypto_balance.bitcoin * prices.bitcoin) + (wallet.crypto_balance.ethereum * prices.ethereum) + (wallet.crypto_balance.ripple * prices.ripple)).toFixed(2)}</p>
              <div className='wallet_url'>
                <p>{wallet.address}</p>
                <IconContext.Provider value={{ color: 'white' }}>
                  <button onClick={() => copyToClipboard(wallet.address)}><BiCopy /></button>
                </IconContext.Provider>
              </div>
            </div>
            <button onClick={() => deleteWallet(index)}>Delete</button>
          </div>
        ))}

        <button onClick={addNewWallet}>Create New Wallet + </button>

      </div>
    </div>
  );
}



export default Wallet