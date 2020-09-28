import React from 'react';

export default function UserInfoInput({ label, type, name, value, handleChange, max, pattern }) {
    return (
        <li>
            <label>{label}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    min='0'
                    max={max}
                    pattern={pattern}
                    required
                >
                </input>
            </label>
        </li>
    )
}