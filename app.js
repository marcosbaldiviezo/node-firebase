var express = require('express');
var app = express();

// Firebase
var firebase = require('firebase-admin');

var serviceAccount = require("./okayfunds-firebase-adminsdk-gjkbk-70de3dfb9d.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://okayfunds.firebaseio.com'
});

var db = firebase.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

var usersRef = ref.child("users");
usersRef.set({
alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
},
gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
}
});


var uid = "QU3Thu4Z8OTTl0fMDFgnmW2D4k52"; //this can be existing user UID
var additionalClaims = {
   premiumAccount: true
};

firebase.auth().createCustomToken(uid, additionalClaims)
  .then(function(customToken) {
     // Send token back to client
     console.log(customToken);
  })
  .catch(function(error) {
     console.log("Error creating custom token:", error);
});

// Firebase


app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});