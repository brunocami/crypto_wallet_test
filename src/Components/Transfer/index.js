import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
import { BiTransferAlt } from 'react-icons/bi'
import { IconContext } from "react-icons";

function Transfer() {

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptoToTransferFrom, SetCryptoToTransferFrom] = useState('bitcoin');
  const [cryptoToTransferTo, SetCryptoToTransferTo] = useState('ethereum');
  const [transferInfo, SetTransferInfo] = useState({
    tranferFrom: cryptoToTransferFrom,
    transferTo: cryptoToTransferTo,
    amount: 0,
    address: ''
  });

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1')
      .then(response => {
        setCryptocurrencies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const CryptoToTransferFrom = (e) => {
    console.log('data-value:', e.currentTarget.getAttribute('data-value'));
    const selectedCrypto = e.currentTarget.getAttribute('data-value');
    console.log('selectedCrypto:',);
    SetCryptoToTransferFrom(selectedCrypto);
    SetTransferInfo({ ...transferInfo, tranferFrom: selectedCrypto });
  }

  const CryptoToTransferTo = (e) => {
    console.log('data-value:', e.currentTarget.getAttribute('data-value'));
    const selectedCrypto = e.currentTarget.getAttribute('data-value');
    SetCryptoToTransferTo(selectedCrypto);
    SetTransferInfo({ ...transferInfo, transferTo: selectedCrypto });
  }

  const handleTransfer = async () => {
    try {
      localStorage.setItem('transferInfo', JSON.stringify(transferInfo));
      alert('Coin transfer successful!');
    } catch (error) {
      console.error(error);
      alert('Coin transfer failed!');
    }
  };


  const SwitchTransferValues = () => {
    SetCryptoToTransferFrom(cryptoToTransferTo)
    SetCryptoToTransferTo(cryptoToTransferFrom)
    SetTransferInfo({ ...transferInfo, transferTo: cryptoToTransferFrom, tranferFrom:cryptoToTransferTo });
  }

  return (
    <div className='transfer_container'>
      <h1> My Crypto transfer</h1>
      <div className='transfer_card_container'>
        <div className="transfer_card">
          <div className="transfer_wrapper">
            <div className='transfer_input_container'>
              <nav>
                <label htmlFor="touch_1"><span>{cryptoToTransferFrom}</span></label>
                <input type="checkbox" id="touch_1" />

                <ul className="slide">
                  {cryptocurrencies.map(crypto => (
                    <li key={crypto.id} data-value={crypto.id} onClick={CryptoToTransferFrom}>
                      {crypto.name}
                    </li>
                  ))}
                </ul>

              </nav>

              <IconContext.Provider value={{ size: '50px' }}>
                <button className='transfer_logo' onClick={SwitchTransferValues}>
                  <BiTransferAlt />
                </button>
              </IconContext.Provider>

              <nav>
                <label htmlFor="touch_2"><span>{cryptoToTransferTo}</span></label>
                <input type="checkbox" id="touch_2" />

                <ul className="slide">
                  {cryptocurrencies.map(crypto => (
                    <li key={crypto.id} data-value={crypto.id} onClick={CryptoToTransferTo}>
                      {crypto.name}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <h2>To Address</h2>
            <div className='transfer_url'>
              <input type="text" onChange={(event) => SetTransferInfo({ ...transferInfo, address: event.target.value })} />
            </div>
            <h2>Amount To Send</h2>
          </div>
          <div className="send_amount_container">
            <div className="webflow-style-input">
              <input type="number" placeholder='0.000' onChange={(event) => SetTransferInfo({ ...transferInfo, amount: event.target.value })} />
              <span>{cryptoToTransferFrom}</span>
            </div>

            <IconContext.Provider value={{ size: '50px' }}>
              <button className='transfer_logo'>
                <BiTransferAlt />
              </button>
            </IconContext.Provider>

            <div className="webflow-style-input">
              <input type="number" placeholder='' />
              <span>{cryptoToTransferTo}</span>
            </div>
          </div>
          <div className="button-wrapper">
            <button className="btn fill" onClick={handleTransfer}>SENT COIN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfer