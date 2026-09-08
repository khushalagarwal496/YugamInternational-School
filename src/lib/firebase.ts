import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";

const defaultFallbackConfig = {
  apiKey: "AIzaSyAnRRmMhTRuWu6xeMvgtiisi11r8la3Rt8",
  authDomain: "assiement-d5073.firebaseapp.com",
  projectId: "assiement-d5073",
  storageBucket: "assiement-d5073.firebasestorage.app",
  messagingSenderId: "859424635952",
  appId: "1:859424635952:web:746cb8f8bd3fffb78e01f5",
  measurementId: "G-KNWZXK1SSW",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFallbackConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFallbackConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFallbackConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultFallbackConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFallbackConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFallbackConfig.appId,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultFallbackConfig.measurementId,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

/**
 * Initializes and returns Firebase Auth instance safely across SSR and Client environments.
 */
export function getFirebaseAuth(): Auth {
  try {
    if (!app) {
      app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    }
    if (!auth && app) {
      auth = getAuth(app);
    }
  } catch (error) {
    console.error("Firebase initialization warning:", error);
    if (!app) {
      app = !getApps().length ? initializeApp(defaultFallbackConfig) : getApps()[0];
    }
    if (!auth && app) {
      auth = getAuth(app);
    }
  }
  return auth!;
}

/**
 * Maps raw Firebase error codes to friendly, actionable messages for the user.
 */
export function getFriendlyFirebaseErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = String((error as { code: unknown }).code);
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please sign in or use a different email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Please ensure it has at least 6 characters with letters and numbers.";
      case "auth/network-request-failed":
        return "Network connection issue. Please check your internet connection.";
      case "auth/operation-not-allowed":
        return "Email/Password sign-in is not enabled in the Firebase Console.";
      case "auth/too-many-requests":
        return "Too many requests. Please wait a few moments and try again.";
      case "auth/user-disabled":
        return "This user account has been disabled.";
      default:
        break;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message.replace(/^Firebase:\s*/, "");
  }

  return "An unexpected authentication error occurred. Please try again.";
}

/**
 * Registers a new user with Firebase Authentication and sets their displayName.
 */
export async function registerWithFirebase(
  name: string,
  email: string,
  pass: string,
): Promise<User> {
  const authInstance = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(authInstance, email.trim(), pass);
  if (name.trim()) {
    await updateProfile(credential.user, { displayName: name.trim() });
  }
  return credential.user;
}

/**
 * Signs the user out from Firebase Authentication.
 */
export async function logoutFromFirebase(): Promise<void> {
  const authInstance = getFirebaseAuth();
  await signOut(authInstance);
}

/**
 * Subscribes to Firebase Auth state changes.
 */
export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  try {
    const authInstance = getFirebaseAuth();
    if (!authInstance) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(authInstance, callback);
  } catch (err) {
    console.error("Firebase auth state subscription failed:", err);
    callback(null);
    return () => {};
  }
}
