import React from 'react';

export default function ItemPrice({ item }) {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan='2'>{item.name}</th>
                </tr>
            </thead>
            <tbody>
            {Object.entries(item.price).map(price => (
                <tr key={price}>
                    <td key={price[0]}>{price[0]}</td>
                    <td key={price[1]}>{price[1]}</td>
                </tr>
                ))}
            </tbody>
        </>
    )
}