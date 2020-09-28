import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';

import db from './api/firestore';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Price from './components/Price/Price';
import Reservation from './components/Reservation/Reservation';
import Success from './components/Success/Success';

export default function App() {

    let [rentProvider, setRentProvider] = useState({});

    useEffect(() => {
        db.collection('rentProviders').doc('rentProvider1')
        .get()
        .then(doc => setRentProvider(doc.data()))
        .catch(err => console.error(err));
    }, []);

    if (rentProvider.items !== undefined) {
        return (
            <Router>
                <Header />
                
                <Switch>
                    <Route path='/price'>
                        <Price items={rentProvider.items}/>
                    </Route>
                    <Route path='/reservation'>
                        <Reservation items={rentProvider.items} open={rentProvider.open} close={rentProvider.close}/>
                    </Route>
                    <Route path='/success'>
                        <Success />
                    </Route>
                    <Route path='/'>
                        <Home title={rentProvider.title} subtitle={rentProvider.subtitle}/>
                    </Route>
                </Switch>
            </Router>
        )
    } else {
        return (
            <p>Wait a second...</p>
        )
    }
}