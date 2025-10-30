import React from 'react';
import './App.css';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import ClientListPage from './components/ClientListPage';
import ClientDetailsPage from './components/ClientDetailsPage';
import ProfilePage from './components/ProfilePage';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  return (
    <div className="App">
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'clientList' && <ClientListPage />}
      {currentPage === 'clientDetails' && <ClientDetailsPage />}
      {currentPage === 'profile' && <ProfilePage />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;

