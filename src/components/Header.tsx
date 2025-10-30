import React from 'react';
import './Header.css';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import LogoutConfirmModal from './LogoutConfirmModal';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false, 
  onBackClick,
  title,
}) => {
  const { navigateTo } = useNavigation();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigateTo('login');
    }
  };

  const handleLogoutClick = () => {
    setShowMenu(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigateTo('login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {showBackButton && (
          <button 
            className="header-back-button" 
            onClick={handleBackClick}
            aria-label="Volver"
          >
            <img src="/img/arrow-icon.png" alt="" className="back-arrow-icon" />
          </button>
        )}
        <h1 className="header-title">{title || 'Gestión de clientes'}</h1>
      </div>

      <div className="header-right">
        <div className="header-user">
          <div className="header-avatar-placeholder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span className="header-username">{user?.name || 'Usuario'}</span>
          <button 
            className="header-menu-button" 
            aria-label="Menú"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img src="/img/deploy-icon.png" alt="" className="deploy-icon" />
          </button>

          {showMenu && (
            <div className="header-dropdown">
              <button className="dropdown-item" onClick={() => { navigateTo('profile'); setShowMenu(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Mi perfil
              </button>
              <button className="dropdown-item" onClick={handleLogoutClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
};

export default Header;

