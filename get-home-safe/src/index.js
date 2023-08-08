import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { UserProvider } from './components/user_context';
import { getStorage } from 'firebase/storage';


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAahzBrUHqxD_ZEdRuibccoM1XiZSP_Wdk",
  authDomain: "info442-71420.firebaseapp.com",
  projectId: "info442-71420",
  storageBucket: "info442-71420.appspot.com",
  messagingSenderId: "532857129618",
  appId: "1:532857129618:web:7aee6f32a331623285344b",
  measurementId: "G-ZSJ19SDRGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDB = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
