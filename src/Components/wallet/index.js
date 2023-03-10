import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function WalletDetails(props) {

    const { id } = useParams();
    const [crypto, setCrypto] = useState('');
    const [amount, setAmount] = useState(0);
    const [transferInfo, SetTransferInfo] = useState({
        type: 'Type',
        crypto: 'Crypto',
        amount: 'Amount',
        time: 'Time',
        address: 'Address'
    });

    const [transferHistory, setTransferHistory] = useState([]);

    const [walletDetail, SetWalletDetail] = useState({
        name: '',
        id: '',
        address: '',
        crypto_balance: {
        },
        balance: 0
    });

    // Get the wallet with the specific ID from the localStorage
    useEffect(() => {
        const wallets = JSON.parse(localStorage.getItem('wallets'));
        const wallet = wallets.find(w => w.id === id);
        SetWalletDetail(wallet);
    }, [id]);


    function updateWallet(walletToUpdate) {
        const wallets = JSON.parse(localStorage.getItem('wallets'));
        const updatedWallets = wallets.map(wallet => {
            if (wallet.id === walletToUpdate.id) {
                return walletToUpdate;
            } else {
                return wallet;
            }
        });
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    }
    useEffect(() => {
        updateWallet(walletDetail);
    }, [walletDetail]);

    useEffect(() => {
        // Create a new transfer history object with the current transferInfo and add it to the transferHistory array
        const newTransferHistory = [...transferHistory, transferInfo];
        setTransferHistory(newTransferHistory);
    
        // Save the entire transfer history array in localStorage
        localStorage.setItem('transferHistory', JSON.stringify(newTransferHistory));
      }, [transferInfo]);


    // BUY CRYPTO


    const handleCryptoChange = (event) => {
        setCrypto(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const buyCrypto = async (event) => {

        event.preventDefault();

        // Make a request to the CoinGecko API to get the current price of the cryptocurrency
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        const currentPrice = data[crypto].usd;
        const numAmount = parseFloat(amount);

        // Calculate the total cost of the transaction
        const totalCost = currentPrice * numAmount;

        // Check if the user has enough balance
        if (totalCost <= walletDetail.balance) {
            // Subtract the total cost from the user's balance and update the wallet
            const updatedWallet = { ...walletDetail, balance: walletDetail.balance - totalCost };
            SetWalletDetail(updatedWallet);

            const currentTime = new Date().toLocaleTimeString();

            const updatedTransferInfo = {...transferInfo, type: 'buy', crypto: crypto, address: walletDetail.address, amount: numAmount, time: currentTime}
            SetTransferInfo(updatedTransferInfo)

            // Simulate a transaction
            console.log(`Successfully bought ${numAmount} ${crypto} for ${totalCost} USD`);
            if (walletDetail.crypto_balance[crypto] !== undefined) {
                walletDetail.crypto_balance[crypto] += numAmount
                updateWallet(walletDetail)
            } else {
                walletDetail.crypto_balance[crypto] = numAmount
                updateWallet(walletDetail)
            }
        } else {
            // Show an error message
            console.log('Not enough balance');
            alert('Not Enough Balance')
        }
    };


    const sellCrypto = async () => {

        // Make a request to the CoinGecko API to get the current price of the cryptocurrency
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        const currentPrice = data[crypto].usd;
        const numAmount = parseFloat(amount);

        // Calculate the total cost of the transaction
        const totalCost = currentPrice * numAmount;

        // Check if the user has enough balance
        if (numAmount <= walletDetail.crypto_balance[crypto] && walletDetail.crypto_balance[crypto] !== undefined) {
            
            const updatedWallet = { ...walletDetail, balance: walletDetail.balance + totalCost };
            SetWalletDetail(updatedWallet);

            const updatedTransferInfo = {...transferInfo, type: 'sell', crypto: crypto, address: walletDetail.address, amount: numAmount}
            SetTransferInfo(updatedTransferInfo)

            walletDetail.crypto_balance[crypto] -= numAmount
            updateWallet(walletDetail)

        } else {
            // Show an error message
            console.log('Not enough crypto balance');
            alert('Not Enough Amount of Crypto')
        }
    };

    return (
        <div className='wallet_detail_container'>
            <h1>{walletDetail.name}</h1>
            <div className='wallet_detail_card_container'>
                <div className='list_container'>
                    <p>Wallet Balance: {walletDetail.balance.toFixed(2)} USD</p>
                    <ul className="list">
                        <p>Crypto Currencie </p>
                        {Object.entries(walletDetail.crypto_balance).map(([key, value]) => (
                            <li key={key} data-value={key} className='crypto_info'>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='transaction_container'>
                    <div className="wallet_detail_send_amount_container">
                        <div className="wallet_detail_input">
                            <input type="text" value={crypto} placeholder='Search Crypto' onChange={handleCryptoChange} />
                            <input type="number" value={amount} onChange={handleAmountChange} />
                            <span>max sell: {walletDetail.crypto_balance[crypto]}</span>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <button className="btn fill" onClick={buyCrypto}>BUY</button>
                        <button className="btn outline" onClick={sellCrypto}>SELL</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WalletDetails;