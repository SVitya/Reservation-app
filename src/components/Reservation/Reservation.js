import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import db from '../../api/firestore';
import './Reservation.css';

import DateInput from '../DateInput/DateInput';
import TimeInput from '../TimeInput/TimeInput';
import NumberInputs from '../NumberInputs/NumberInputs';
import UserInfoInput from '../UserInfoInput/UserInfoInput';
import SubmitButton from '../SubmitButton/SubmitButton';

import { closestHour, currentDate, tomorrowDate } from '../../utils/Utils';

function Reservation({ items, open, close, history }) {

    let [formValues, setFormValues] = useState({
        date: closestHour() < close ? currentDate() : tomorrowDate(),
        time: open < closestHour() && closestHour() < close ? closestHour() + ':00' : open  + ':00',
        phone: '+38',
    });

    let [reserved, setReserved] = useState({});

    useEffect(() => {
        updateItemsInFormValues()
        // eslint-disable-next-line
    }, []);

    function handleChange(event) {
        const { name, value, type } = event.target;

        if (name === 'time') {
            setFormValues({...formValues, [name]: value}, updateItemsInFormValues())
        } else if (type === 'number') {
            setFormValues({...formValues, items: {...formValues.items, [name]: +value}})
        } else {
            setFormValues({...formValues, [name]: value})
        }
    }

    function hendleSubmit(event) {
        event.preventDefault();

        if (Object.values(formValues.items).some(item => item !== 0)) {
            let updatedReservation = {};

            for (let item in formValues.items) {
                if(formValues.items[item] > 0) {
                    updatedReservation = {...updatedReservation, [item]: reserved[item] !== undefined ? reserved[item] + formValues.items[item] : formValues.items[item]}
                }
            }

            db.collection('dates')
                .doc(formValues.date)
                .set({[formValues.time]: {...updatedReservation}}, {merge: true})
                .then(() => history.push('/success'))
                .catch(err => console.log(err));

            db.collection('dates')
                .doc(formValues.date)
                .collection(formValues.time)
                .doc()
                .set({
                    ...formValues.items,
                    name: formValues.name,
                    phone: formValues.phone,
                });
        } else {
            alert('Please, choose some items');
        }
    }

    function updateItemsInFormValues() {
        let itemsValues;
        items.forEach(item => itemsValues = ({...itemsValues, [item.id]: 0}));
        setFormValues({...formValues, items: {...itemsValues}});
    }

    return (
        <form className='reservation' onSubmit={hendleSubmit}>
            <ul>
                <DateInput
                    value={formValues.date}
                    handleChange={handleChange}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    close={close}
                />
                <TimeInput 
                    value={formValues.time}
                    handleChange={handleChange}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    date={formValues.date}
                    open={open}
                    close={close}
                />
                <NumberInputs
                    items={items}
                    formValues={formValues}
                    handleChange={handleChange}
                    reserved={reserved}
                    setReserved={setReserved}
                />
                <UserInfoInput
                    label='Name'
                    type='text'
                    name='name'
                    value={formValues.name}
                    handleChange={handleChange}
                    pattern='[a-zA-Zа-яґєіїА-ЯҐЄІЇ ]{2,30}'
                />
                <UserInfoInput
                    label='Phone number'
                    type='tel'
                    name='phone'
                    value={formValues.phone}
                    handleChange={handleChange}
                    pattern='^\+38[0-9]{10}'
                />
                <SubmitButton />
            </ul>
        </form>
    )
}

export default withRouter(Reservation);