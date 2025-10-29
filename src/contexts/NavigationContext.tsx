import React, { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'login' | 'clientList' | 'clientDetails';

interface NavigationContextType {
  currentPage: Page;
  selectedClientId: number | null;
  navigateTo: (page: Page, clientId?: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const navigateTo = (page: Page, clientId?: number) => {
    setCurrentPage(page);
    if (clientId !== undefined) {
      setSelectedClientId(clientId);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, selectedClientId, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe usarse dentro de NavigationProvider');
  }
  return context;
};

