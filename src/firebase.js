import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyACUh2Jq-ANq8nZ1TMD5EsLvEC-4PDImH4",
  authDomain: "react-redux-router.firebaseapp.com",
  databaseURL: "https://react-redux-router.firebaseio.com",
  projectId: "react-redux-router",
  storageBucket: "react-redux-router.appspot.com",
  messagingSenderId: "971032575992"
};
firebase.initializeApp(config);

export var firestore = firebase.firestore();

export default firebase;
