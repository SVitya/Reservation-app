import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDAGtr35zpQde_Uw8_W_BN5z6VpcXaTz7k",
    authDomain: "reservation-e459e.firebaseapp.com",
    databaseURL: "https://reservation-e459e.firebaseio.com",
    projectId: "reservation-e459e",
    storageBucket: "reservation-e459e.appspot.com",
    messagingSenderId: "194705364201",
    appId: "1:194705364201:web:8cc08d320057cf864d8c78"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;