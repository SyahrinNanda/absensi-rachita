import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpyh9TQug5wiQXmZYRyeom3ETb5QBxP5k",
  authDomain: "absensi-rachita.firebaseapp.com",
  projectId: "absensi-rachita",
  storageBucket: "absensi-rachita.firebasestorage.app",
  messagingSenderId: "1046624806841",
  appId: "1:1046624806841:web:7bf6209076cd0c876e3868",
  measurementId: "G-HG18LM08WF",
};

// Pastikan hanya ada satu instance Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firestore
export const db = getFirestore(app);

// Inisialisasi Realtime Database
export const rtdb = getDatabase(app);

// Firebase Storage Instance
export const storage = getStorage(app);

// Inisialisasi Analytics hanya di browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn("Firebase Analytics tidak didukung di lingkungan ini.");
    }
  });
}

export default app;
