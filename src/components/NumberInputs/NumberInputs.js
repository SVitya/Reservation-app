import React, { useEffect} from 'react';
import db from '../../api/firestore';

import NumberInput from '../NumberInput/NumberInput';

export default function NumberInputs({ items, formValues, handleChange, reserved, setReserved }) {

    useEffect(() => {
        let mounted = true;

        if (formValues.date !== '') {
            db.collection('dates').doc(formValues.date)
                .get()
                .then(doc => {
                    if (mounted) {
                        if (doc.data() !== undefined && doc.data()[formValues.time] !== undefined) {
                            setReserved(doc.data()[formValues.time])
                        } else {
                            setReserved({})
                        }                   
                    }
                })
                .catch(err => {
                    if (mounted) {
                        console.error(err)
                    }
                })
        }

        return () => { mounted = false };
    }, [formValues.date, formValues.time, items, setReserved])

    return (
        <div>
            {items.map(item => (<NumberInput 
                    key={item.id} 
                    item={item}
                    value={formValues.items !== undefined ? formValues.items[item.id] : ''}
                    handleChange={handleChange}
                    max={reserved[item.id] !== undefined ? item.quantity - reserved[item.id] : item.quantity}
            />))}
        </div>
    )
}