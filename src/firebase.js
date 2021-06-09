import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBUyqvV8BGzqsOBG_pY7-5vdpn-73BhnOY',
  authDomain: 'petsvetlook.firebaseapp.com',
  databaseURL: 'https://petsvetlook.firebaseio.com',
  projectId: 'petsvetlook',
  storageBucket: 'petsvetlook.appspot.com',
  messagingSenderId: '152641342481',
  appId: '1:152641342481:web:ab932fe8f892ec0835b5b0',
  measurementId: 'G-T9TLDWED2Z',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db, firebase };
