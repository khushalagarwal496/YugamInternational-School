import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  getFirebaseAuth,
  logoutFromFirebase,
  registerWithFirebase,
  subscribeToAuthState,
} from "@/lib/firebase";
import { clearInMemorySession, readInMemorySession, saveInMemorySession } from "@/lib/session";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    return getFirebaseAuth().currentUser;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (name: string, email: string, pass: string) => {
    const createdUser = await registerWithFirebase(name, email, pass);
    setUser(createdUser);
    saveInMemorySession({
      name: name.trim(),
      email: email.trim(),
      password: pass,
      mobile: readInMemorySession()?.mobile ?? "9876543210",
      username: readInMemorySession()?.username ?? "khushal123@",
    });
    return createdUser;
  };

  const logout = async () => {
    await logoutFromFirebase();
    clearInMemorySession();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    logout,
  };
}
