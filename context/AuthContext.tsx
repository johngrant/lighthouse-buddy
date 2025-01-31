'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('auth_token');
    console.log('Checking auth token:', token);
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt with:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Store dummy token
      const token = 'dummy_token_' + Date.now();
      localStorage.setItem('auth_token', token);
      
      // Also set a cookie for the middleware
      document.cookie = `auth_token=${token}; path=/; max-age=86400`;
      
      setIsAuthenticated(true);
      console.log('Login successful, redirecting...');
      
      // Force a hard redirect instead of using the router
      window.location.href = '/app/stockton-street-co/monitors';
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
