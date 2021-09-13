import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDFMETlOLXzHAQQnCT68Wzm8VLiTAa-Ixk",
    authDomain: "whatsapp-clone-32744.firebaseapp.com",
    projectId: "whatsapp-clone-32744",
    storageBucket: "whatsapp-clone-32744.appspot.com",
    messagingSenderId: "929800075543",
    appId: "1:929800075543:web:02baf6df7b89db09085f52"
  };

const app =  (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()

const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider} 
