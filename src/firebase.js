// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAaVSdqUZawI_YxEu2gjbJ4N29DeF_hWI",
  authDomain: "conectaunimet.firebaseapp.com",
  projectId: "conectaunimet",
  storageBucket: "conectaunimet.appspot.com",
  messagingSenderId: "940197259041",
  appId: "1:940197259041:web:15a1e2c4e31f1c8adc8060"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app); 
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
// export const facebookProvider = new FacebookAuthProvider();
// export const appleProvider = new AppleAuthProvider();


