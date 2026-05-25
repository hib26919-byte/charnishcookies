import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function privateKey() {
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
}

export function adminApp() {
  if (getApps().length) return getApps()[0];
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !privateKey()) {
    throw new Error('Firebase Admin environment variables are missing.');
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey()
    })
  });
}

export function adminDb() {
  return getFirestore(adminApp());
}

export function adminAuth() {
  return getAuth(adminApp());
}
