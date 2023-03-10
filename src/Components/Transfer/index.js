import React, { useState } from 'react';
import './style.css'

function Transfer() {

  const transfer = JSON.parse(localStorage.getItem('transferHistory'));

  if (transfer !== null) {
    return (
      <div className='transfer_container'>
        <h1> My Crypto transfer</h1>
        <div className='transfer_card_container'>
          <div className="transfer_card">
            <div className="transfer_wrapper"> 
              {transfer.map(transfer => ( 
                
                <div className='transfer_info'>
                  <p>{transfer.type}</p>
                  <p>{transfer.crypto}</p>
                  <p>{transfer.amount}</p>
                  <p>{transfer.address}</p>
                  <p>{transfer.time}</p>
                </div>            
              ))}
  
            </div>
  
  
          </div>
        </div>
      </div>
    )

  } else {
    return (
      <div className='transfer_container'>
        <h1> My Crypto transfer</h1>
        <div className='transfer_card_container'>
          <div className="transfer_card">
            <div className="transfer_wrapper"> 
                <div className='transfer_info'>
                  <p>no transaction</p>
                </div>            
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Transfer