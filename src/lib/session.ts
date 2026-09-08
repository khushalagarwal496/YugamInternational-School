/**
 * In-memory temporary session store for transferring registration flow data
 * securely to the details/validation screen without persisting passwords in storage.
 */

export type SessionUser = {
  name: string;
  email: string;
  password: string;
  mobile: string;
  username: string;
};

export const DEMO_MOBILE = "9876543210";
export const DEMO_USERNAME = "khushal123@";

// In-memory state kept during the active SPA session
let inMemorySession: SessionUser | null = null;

export function saveInMemorySession(user: SessionUser): void {
  inMemorySession = { ...user };
}

export function readInMemorySession(): SessionUser | null {
  return inMemorySession ? { ...inMemorySession } : null;
}

export function clearInMemorySession(): void {
  inMemorySession = null;
}

// Backward compatibility helper signatures
export const saveSession = saveInMemorySession;
export const readSession = readInMemorySession;
export const clearSession = clearInMemorySession;
