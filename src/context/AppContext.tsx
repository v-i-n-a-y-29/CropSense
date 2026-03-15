import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  user: { id: string; role: 'farmer' | 'chc' | 'govt' | null } | null;
  login: (role: 'farmer' | 'chc' | 'govt') => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<{ id: string; role: 'farmer' | 'chc' | 'govt' | null } | null>(null);

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  
  const login = (role: 'farmer' | 'chc' | 'govt') => {
    setUser({ id: `user-${Date.now()}`, role });
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ language, toggleLanguage, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
