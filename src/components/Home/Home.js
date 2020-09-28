import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ title, subtitle}) {
    return (
        <div className='home'>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <Link to='/price'>Price</Link>
            <Link to='/reservation'>Reservation</Link>
        </div>
    )
}