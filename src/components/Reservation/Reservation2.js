import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import db from '../../api/firestore'
import './Reservation.css'

import DateInput from '../DateInput/DateInput'
import TimeInput from '../TimeInput/TimeInput'
import NumberInput from '../NumberInput/NumberInput'
import UserInfoInput from '../UserInfoInput/UserInfoInput'
import SubmitButton from '../SubmitButton/SubmitButton'

import { closestHour, currentDate, tomorrowDate } from '../../utils/Utils'

function Reservation({ items, open, close, history }) {

    let [formValues, setFormValues] = useState({
        date: closestHour() < close ? currentDate() : tomorrowDate(),
        tel: '+38',
    });

    useEffect(() => {
        updateItemsInFormValues()
        // eslint-disable-next-line
    }, [])


    function handleChange(event) {
        const { name, value, type } = event.target;
        setFormValues({...formValues, [name]: value})

        if (name === 'time') {
            updateItemsInFormValues()
        }
        if (type === 'number') {
            setFormValues({...formValues, [name]: +value})
        }
    }

    function hendleSubmit(event) {
        event.preventDefault();

        // if (formValues.sup !== 0 || formValues.kayak1 !== 0 || formValues.kayak2 !== 0) {
        // db.collection('users')
        //     .doc(formValues.tel)
        //     .set({
        //         name: formValues.name,
        //         tel: formValues.tel,
        //         date: formValues.date,
        //         time: formValues.time,
        // })
            
        db.collection('dates')
            .doc(formValues.date)
            .set({[formValues.time]: {...formValues}}, {merge: true})
            .then(() => history.push('/success'))
            .catch(err => console.log(err))
    }

    function updateItemsInFormValues() {
        let itemsValues;
        items.forEach(item => itemsValues = ({...itemsValues, [item.id]: 0}))
        setFormValues({...formValues, items: {...itemsValues}})
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
                    date={formValues.date}
                    open={open}
                    close={close}
                />
                {items.map(item => (<NumberInput key={item.id} item={item} value={formValues.items[item.id]} handleChange={handleChange} date={formValues.date} time={formValues.time}/>))}
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
                    name='tel'
                    value={formValues.tel}
                    handleChange={handleChange}
                    pattern='^\+38[0-9]{10}'
                />
                <SubmitButton />
            </ul>
        </form>
    )
}

export default withRouter(Reservation);