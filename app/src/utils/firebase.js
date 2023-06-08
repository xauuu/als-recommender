import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa7_VbOSOYxDUXPNzwaI6Sv_4mjmYUSQ8",
  authDomain: "xauu-88869.firebaseapp.com",
  projectId: "xauu-88869",
  storageBucket: "xauu-88869.appspot.com",
  messagingSenderId: "463392719921",
  appId: "1:463392719921:web:75127cfd4d891911e90110",
  measurementId: "G-TX21S90GDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
