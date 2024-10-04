import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD99b9zQ3IE1351P7ipcfJyqeL6pZ7AN3c",
  authDomain: "voterdb-3edb4.firebaseapp.com",
  projectId: "voterdb-3edb4",
  storageBucket: "voterdb-3edb4.appspot.com",
  messagingSenderId: "1062760146377",
  appId: "1:1062760146377:web:144b7569ef704a9badb418"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);