import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

// Firebase configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyDJmKRUHZSnTA8xsO29sBMmu2gKE7fEWYQ",
  authDomain: "harshmehtaportfolio.firebaseapp.com",
  projectId: "harshmehtaportfolio",
  storageBucket: "harshmehtaportfolio.firebasestorage.app",
  messagingSenderId: "258432736367",
  appId: "1:258432736367:web:41e3d0727380c43272419a",
  measurementId: "G-5M5CH4ZYMZ",
}

// Ensure we only initialize once (Next.js can render on server and client)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// Analytics only on client and when supported
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) {
      try {
        getAnalytics(app)
      } catch {}
    }
  })
}

export const db = getFirestore(app)

export default app


