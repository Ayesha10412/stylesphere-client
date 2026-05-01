"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/config/api";
import { useRouter } from "next/navigation";

/* --------------------------
   🔹 Types
-------------------------- */
interface SessionData {
  
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: { id: number; name: string }[];
  
  permission_names?: string[];
}

interface SessionContextType {
  session: SessionData | null;
  loading: boolean;
  setSession: (data: SessionData | null) => void;
  clearSession: () => void;
  refreshSession:()=>Promise<void>;
  signin: (data: SessionData, redirectUrl?: string) => void;
  signout: () => void;
}

/* --------------------------
   🔹 Context
-------------------------- */
const SessionContext = createContext<SessionContextType | undefined>(undefined);

/* --------------------------
   🔹 Provider
-------------------------- */
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Fetch session from backend
   */
  const refreshSession = async () => {
    try {
      const res = await api.get("/user/me");
      setSession(res.data);
    } catch {
      setSession(null);
    }
  };

  /**
   * Clear session locally
   */
  const clearSession = () => {
    setSession(null);
  };

  /**
   * Sign in (set session manually after login)
   */
  const signin = (data: SessionData, redirectUrl = "/") => {
    setSession(data);
    router.push(redirectUrl);
  };

  /**
   * Logout
   */
  const signout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setSession(null);
      router.push("/auth/signin"); // ✅ Next.js way
    }
  };

  /**
   * Load session on mount
   */
  useEffect(() => {
    const init = async () => {
      await refreshSession();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        loading,
        setSession,
        clearSession,
        refreshSession,
        signin,
        signout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

/* --------------------------
   🔹 Hook
-------------------------- */
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};