import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
