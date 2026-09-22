import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7qN2JNkz4Kbs3MAT3mLmdivZPZOPVfOQ",
  authDomain: "roots-dental-clinic.firebaseapp.com",
  projectId: "roots-dental-clinic",
  storageBucket: "roots-dental-clinic.firebasestorage.app",
  messagingSenderId: "574833290012",
  appId: "1:574833290012:web:53b7c7223be8f20a6468d9",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
