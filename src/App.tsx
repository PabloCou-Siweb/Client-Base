import React from 'react';
import './App.css';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import LoginPage from './components/LoginPage';
import ClientListPage from './components/ClientListPage';
import ClientDetailsPage from './components/ClientDetailsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  return (
    <div className="App">
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'clientList' && <ClientListPage />}
      {currentPage === 'clientDetails' && <ClientDetailsPage />}
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;

