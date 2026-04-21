"use client";

import  {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/config/api";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: { id: number; name: string }[];
  permission_names?: string[];
}

interface SessionContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshSession: () => Promise<void>;
  signout: () => Promise<void>;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch user from backend
   */
  const refreshSession = async () => {
    try {
      const res = await api.get("/me"); // cookie automatically sent
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  /**
   * Logout
   */
  const signout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      window.location.href = "/login"; // client redirect
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
        user,
        setUser,
        refreshSession,
        signout,
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};