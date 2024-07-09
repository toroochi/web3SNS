// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDVyMqR2jgmxwd35C_HTtAL4eUCg8IiFk",
  authDomain: "blog-87844.firebaseapp.com",
  projectId: "blog-87844",
  storageBucket: "blog-87844.appspot.com",
  messagingSenderId: "220384985182",
  appId: "1:220384985182:web:6e97fb565b4d5e7c50b4cf",
  measurementId: "G-05GCDQ9YC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
