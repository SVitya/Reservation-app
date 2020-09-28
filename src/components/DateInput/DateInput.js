import React from 'react';

import { currentDate } from '../../utils/Utils';

export default function DateInput({ value, handleChange, formValues, setFormValues, close }) {
    return (
        <li>
            <label>Date
                <input
                    type='date'
                    name='date'
                    value={value}
                    onChange={handleChange}
                    required
                    min={currentDate()}
                ></input>
            </label>
        </li>
    )
}