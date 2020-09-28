import React, { useState, useEffect } from 'react';
import Parser from 'html-react-parser';

import { closestHour, currentDate } from '../../utils/Utils';

export default function TimeInput({ value, handleChange, formValues, setFormValues, date, open, close}) {

    let [timeOptions, setTimeOptions] = useState('');

    useEffect(() => {
        if (date === currentDate()) {
            setTimeOptions(createOptions(closestHour()))
            setFormValues({...formValues, time: closestHour()})
        } else {
            setTimeOptions(createOptions(open))
            setFormValues({...formValues, time: `${open}:00`})
        }
        // eslint-disable-next-line
    }, [date]);

    function createOptions(timeToStartWith) {
        let options = '';

        for (let i = timeToStartWith; i < close; i++) {
            options += `<option value='${i}:00'>${i}:00</option>`;
        }

        return options;
    }

    return (
        <li>
            <label>Time
                <select
                    name='time'
                    value={value}
                    onChange={handleChange}
                    required
                >
                    {Parser(timeOptions)}
                </select>
            </label>
        </li>
    )
}