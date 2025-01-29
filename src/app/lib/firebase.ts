import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  applyActionCode,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Ensure only one Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Realtime Database
export const rtdb = getDatabase(app);

// Firebase Storage Instance
export const storage = getStorage(app);

// Initialize Analytics only in browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  });
}

// Create Firebase Authentication
export const FirebaseAuth = getAuth();

export const SignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const SignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const SignOut = async () => {
  try {
    await signOut(FirebaseAuth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const sendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(FirebaseAuth, callback);
};

export const verifyEmail = async (actionCode: string) => {
  try {
    await applyActionCode(FirebaseAuth, actionCode);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default app;
