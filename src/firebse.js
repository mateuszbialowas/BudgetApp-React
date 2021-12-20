import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBLbkLNfAjfS5duTkKlY4StOBlFXpgHyA",
  authDomain: "budgetapp-development.firebaseapp.com",
  projectId: "budgetapp-development",
  storageBucket: "budgetapp-development.appspot.com",
  messagingSenderId: "1076283698394",
  appId: "1:1076283698394:web:7445f35395fbe6a7b189e3",
  databaseURL: "https://budgetapp-development-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
