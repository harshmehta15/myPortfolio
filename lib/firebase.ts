import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

// Firebase configuration via environment variables
const requiredEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
]

const missingKeys = requiredEnvKeys.filter((key) => !process.env[key])
if (missingKeys.length > 0) {
  // Fail fast during build/dev if any required config is missing
  throw new Error(
    `Missing Firebase env vars: ${missingKeys.join(", ")}. Add them in your Vercel project settings.`
  )
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
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


