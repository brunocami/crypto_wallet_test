import React from 'react'
import { Link } from "react-router-dom";
import { DiBrackets } from "react-icons/di";
import { IconContext } from "react-icons";
import './style.css'

function Sidebar() {
    return (
        <>
            <IconContext.Provider value={{ size: '50px' }}>
                <div className='logo'>
                    <Link to='/'>
                        <DiBrackets />
                    </Link>
                </div>
            </IconContext.Provider>
            <ul className='nav_section_list'>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='/mywallet'>My Wallet</Link></li>
                <li><Link to='/transfer'>Transfer Coin</Link></li>
            </ul>
        </>
    )
}

export default Sidebar