import React from 'react';
import './LogoutConfirmModal.css';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="logout-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="logout-modal-content">
          <div className="logout-icon">
            <img src="/img/warning-icon.png" alt="" className="logout-icon-img" />
          </div>

          <div className="logout-text">
            <h3 className="logout-title">Cerrar sesión</h3>
            <p className="logout-description">
              Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.
            </p>
          </div>
        </div>

        <div className="logout-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm-logout" onClick={onConfirm}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;

