export type UserRole = "user" | "admin";

export interface AuthUser {
  _id: string;
  username: string;
  Email: string;
  Role: UserRole;
}

const USER_KEY = "user";
const TOKEN_KEY = "token";

export function setAuth(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.Role === "admin";
}
