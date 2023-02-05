// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3aYZbmP0Bg5rN_ZMEnslaSon9Opz6Bro",
  authDomain: "mama-6e44a.firebaseapp.com",
  projectId: "mama-6e44a",
  storageBucket: "mama-6e44a.appspot.com",
  messagingSenderId: "689956574896",
  appId: "1:689956574896:web:f6c144b75d2848ba15cd75",
  measurementId: "G-90XQB9RXN3",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
// const analytics = getAnalytics(app);
