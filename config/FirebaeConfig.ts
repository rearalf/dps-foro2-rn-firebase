import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLuDkunofBY7xB4Y_wTwnw_zVzsR9c4Bw",
  authDomain: "dps-foro2-gastos-app.firebaseapp.com",
  projectId: "dps-foro2-gastos-app",
  storageBucket: "dps-foro2-gastos-app.firebasestorage.app",
  messagingSenderId: "1094967591447",
  appId: "1:1094967591447:web:14a82a9787d19e18ef1252",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
