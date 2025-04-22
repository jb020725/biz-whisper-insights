
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('bizWhisperUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate a login API call
    setIsLoading(true);
    
    try {
      // This would be a real API call in production
      // In this case, we'll just simulate authentication
      
      // Wait for 1 second to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a simulated user object
      const newUser = {
        id: crypto.randomUUID(),
        email,
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('bizWhisperUser', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // Simulate signup API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a simulated user object
      const newUser = {
        id: crypto.randomUUID(),
        email,
        name
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('bizWhisperUser', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bizWhisperUser');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
