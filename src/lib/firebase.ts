import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4CVilXF6XVkXaCt39nILdR1D4xu9PMA0",
  authDomain: "bihardarshan-26916.firebaseapp.com",
  projectId: "bihardarshan-26916",
  storageBucket: "bihardarshan-26916.firebasestorage.app",
  messagingSenderId: "500023080659",
  appId: "1:500023080659:web:e8d1a8dfe8449ce0144626",
  measurementId: "G-1KNXZ6PPCV"
};

const app = initializeApp(firebaseConfig);
let analytics;
// Analytics is only available in environments that support it (like browsers)
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, googleProvider, db, storage };
