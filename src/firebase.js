import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDkxaD-NWd7TLlAaXksreK6vYmUmsTmBHs",
    authDomain: "optimized-b2358.firebaseapp.com",
    projectId: "optimized-b2358",
    storageBucket: "optimized-b2358.appspot.com",
    messagingSenderId: "740880946674",
    appId: "1:740880946674:web:5c58f690fd6907ccf4876b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
