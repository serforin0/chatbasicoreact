import firebase from "firebase";



const firebaseConfig = {
     apiKey: "AIzaSyBklpK-eTuTR4ikRBvbGanCEW98-ygt9cM",
     authDomain: "chatyordy-1acd3.firebaseapp.com",
     projectId: "chatyordy-1acd3",
     storageBucket: "chatyordy-1acd3.appspot.com",
     messagingSenderId: "347604018007",
     appId: "1:347604018007:web:da6440bfad8db6cf2f9412",
     measurementId: "G-132ESGCGRF"
   };


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;