import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { User } from '../types/user';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsKid: (accessCode: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  setDemoUser: (user: User) => void;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'parent' | 'admin';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For development/demo purposes
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('mockUser');
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      // For demo purposes, accept admin login
      if (email === 'admin@kokoroquest.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@kokoroquest.com',
          role: 'admin' as const,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('authToken', 'mock-admin-token');
        localStorage.setItem('mockUser', JSON.stringify(adminUser));
        setUser(adminUser);
        return;
      }

      throw new Error('Invalid credentials');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
      throw new Error(message);
    }
  };

  const loginAsKid = async (accessCode: string) => {
    try {
      setError(null);
      const { data } = await api.post('/api/auth/kid-login', { accessCode });
      localStorage.setItem('authToken', data.data.token);
      setUser(data.data.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid access code';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setError(null);
      const { data } = await api.post('/api/auth/register', userData);
      localStorage.setItem('authToken', data.data.token);
      setUser(data.data.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('mockUser');
    setUser(null);
    setError(null);
  };

  const setDemoUser = (demoUser: User) => {
    localStorage.setItem('mockUser', JSON.stringify(demoUser));
    localStorage.setItem('demoMode', 'true');
    setUser(demoUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      error, 
      login, 
      loginAsKid, 
      register, 
      logout,
      setDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}