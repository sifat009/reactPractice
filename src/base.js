import Rebase from 're-base';
import firebase from 'firebase';

var app = firebase.initializeApp({
    apiKey: "AIzaSyA-BPolW1PzbdVWZWoqJvFc5ieiHCO6sBU",
    authDomain: "fish-shop-b89bc.firebaseapp.com",
    databaseURL: "https://fish-shop-b89bc.firebaseio.com",
  });
const base = Rebase.createClass(app.database())

export default base;