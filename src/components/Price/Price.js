import React from 'react';
import { Link } from 'react-router-dom';
import './Price.css';

import ItemPrice from '../ItemPrice/ItemPrice';

export default function Price({ items }) {
    return (
        <div className='price'>
            <table>
                {items.map(item => (<ItemPrice key={item.id} item={item}/>))}
            </table>
            <Link to='/reservation'>Reservation</Link>
        </div>
    )
}