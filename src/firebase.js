import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "********",
    authDomain: "challenge-9eca5.firebaseapp.com",
    projectId: "challenge-9eca5",
    storageBucket: "challenge-9eca5.firebasestorage.app",
    messagingSenderId: "294764928270",
    appId: "1:294764928270:web:a207f2a56e5e61a88fcb5f",
    measurementId: "G-D7SZ50T1GE"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app); 

  export {db, auth} ; 