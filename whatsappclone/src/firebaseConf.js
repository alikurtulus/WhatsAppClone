import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyCj_mNz7a7-KlfRQvC4rSahUCD4qO81Rco",
    authDomain: "whatsappclone-43b8f.firebaseapp.com",
    databaseURL: "https://whatsappclone-43b8f.firebaseio.com",
    projectId: "whatsappclone-43b8f",
    storageBucket: "whatsappclone-43b8f.appspot.com",
    messagingSenderId: "236540859127",
    appId: "1:236540859127:web:7dc04c5286b388207d79f2",
    measurementId: "G-XXMW6HW6SF"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}