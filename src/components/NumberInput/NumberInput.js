import React from 'react';

export default function NumberInput({ item, value, handleChange, max }) {
    return (
        <li>
            <label>{item.name} (max {max})
                <input
                    type='number'
                    name={item.id}
                    value={value}
                    onChange={handleChange}
                    min='0'
                    max={max}
                    required
                >
                </input>
            </label>
        </li>
    )
}