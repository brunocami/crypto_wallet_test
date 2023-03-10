import React from 'react'
import { Link } from "react-router-dom";
import { DiBrackets } from "react-icons/di";
import { IconContext } from "react-icons";
import './style.css'

function Sidebar() {
    return (
        <>
            <div className='logo'>
                <IconContext.Provider value={{ size: '50px' }}>
                    <Link to='/'>
                        <DiBrackets />
                    </Link>
                </IconContext.Provider>
            </div>
            <ul className='nav_section_list'>
                <li><Link to='/'>My Wallet</Link></li>
                <li><Link to='/transfer'>Transfer Coin</Link></li>
            </ul>
        </>
    )
}

export default Sidebar