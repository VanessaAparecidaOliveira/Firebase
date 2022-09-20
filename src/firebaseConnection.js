import firebase from 'firebase/app';
import 'firebase/firestore';
 
const firebaseConfig = {
  apiKey: "AIzaSyAglx5MjRgEg2Nsqp11_WDSxPesakP4hcE",
  authDomain: "cursoappvanessa.firebaseapp.com",
  projectId: "cursoappvanessa",
  storageBucket: "cursoappvanessa.appspot.com",
  messagingSenderId: "489392672894",
  appId: "1:489392672894:web:b6c921167fa982d13dc82f",
  measurementId: "G-KEHKE1Z455"
};
  
  // Initialize Firebase
 
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
 
  export default firebase;