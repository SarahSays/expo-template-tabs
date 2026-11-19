import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const SESSION_STORAGE_KEY = 'orbits-demo-session';

export type SessionMode = 'demo' | 'email';
type Session = { mode: SessionMode; startedAt: string; email?: string };
type SessionContextValue = {
  session: Session | null;
  isLoading: boolean;
  startSession: (mode: SessionMode, email?: string) => Promise<void>;
  endSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(SESSION_STORAGE_KEY)
      .then((storedSession) => {
        if (!mounted || !storedSession) return;
        try {
          setSession(JSON.parse(storedSession) as Session);
        } catch {
          setSession(null);
        }
      })
      .catch(() => {
        if (mounted) setSession(null);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<SessionContextValue>(() => ({
    session,
    isLoading,
    startSession: async (mode, email) => {
      const nextSession: Session = { mode, startedAt: new Date().toISOString(), ...(email ? { email } : {}) };
      setSession(nextSession);
      try {
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
      } catch {
        // Keep the session active in memory if demo persistence is unavailable.
      }
    },
    endSession: async () => {
      setSession(null);
      try {
        await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // The current app session is still ended even if storage is unavailable.
      }
    },
  }), [isLoading, session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
