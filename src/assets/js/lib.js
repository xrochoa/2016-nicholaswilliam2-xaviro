/*----------  LIBRARIES  ----------*/

//React
//=require ../../../bower_components/react/react.js
//=require ../../../bower_components/react/react-dom.js

//Firebase (Reactfire doesn't suppor ES6...consider re-base for synced use of firebase)
//=require ../../../bower_components/firebase/firebase.js

/*----------  CUSTOM JS  ----------*/

(function() {

    let config = {
        apiKey: "AIzaSyA6YoAYrkyWCF_uRwh9PSH2ZI5-fXj8CBw",
        authDomain: "nicholaswilliamapi.firebaseapp.com",
        databaseURL: "https://nicholaswilliamapi.firebaseio.com",
        storageBucket: "nicholaswilliamapi.appspot.com",
        messagingSenderId: "487593784922"
    };

    firebase.initializeApp(config);

}());
