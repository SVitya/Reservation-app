import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header>
            <nav>
                <ul className='nav'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/price'>Price</Link>
                    </li>
                    <li>
                        <Link to='/reservation'>Reservation</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}