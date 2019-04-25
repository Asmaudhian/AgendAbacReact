import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDZ91msHsKO0uxlabHaokQuyT_KgbWPgvc",
    authDomain: "agendabac-b9c83.firebaseapp.com",
    databaseURL: "https://agendabac-b9c83.firebaseio.com",
    projectId: "agendabac-b9c83",
    storageBucket: "agendabac-b9c83.appspot.com",
    messagingSenderId: "969574680306"
  };
firebase.initializeApp(config);

firebase.firestore();

export default firebase;