// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtgLbKno9tWJFNCgrGdcNq6nv-u4n0r10",
  authDomain: "ecommerce-9ad2c.firebaseapp.com",
  projectId: "ecommerce-9ad2c",
  storageBucket: "ecommerce-9ad2c.appspot.com",
  messagingSenderId: "671125768073",
  appId: "1:671125768073:web:b050e0d751fd22a00a0358"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();  