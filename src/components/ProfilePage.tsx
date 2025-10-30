import React, { useState } from 'react';
import './ProfilePage.css';
import Header from './Header';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';

const ProfilePage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileSuccessMessage, setProfileSuccessMessage] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdateProfile = async () => {
    setFullNameError('');
    setEmailError('');
    setProfileSuccessMessage('');

    let hasError = false;

    if (!fullName || fullName.trim().length < 3) {
      setFullNameError('El nombre debe tener al menos 3 caracteres');
      hasError = true;
    }

    if (!email) {
      setEmailError('El email es requerido');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Email inválido');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const response = await authService.updateProfile({
        name: fullName,
        email: email,
      });
      
      updateUser({
        name: fullName,
        email: email,
      });
      
      setProfileSuccessMessage('Perfil actualizado correctamente');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || '';
      if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('correo')) {
        setEmailError('Este email ya está en uso o no es válido');
      } else {
        setEmailError(errorMessage || 'Error al actualizar el perfil');
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMessage('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  const handleUpdatePassword = async () => {
    setError('');
    setSuccessMessage('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    if (!currentPassword) {
      setCurrentPasswordError('La contraseña actual es requerida');
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError('La nueva contraseña es requerida');
      hasError = true;
    } else if (newPassword.length < 6) {
      setNewPasswordError('La contraseña debe tener al menos 6 caracteres');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirma tu nueva contraseña');
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      
      setSuccessMessage(response.message || 'Contraseña actualizada correctamente');
      handleCancel();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error al actualizar la contraseña';
      if (errorMessage.toLowerCase().includes('incorrecta') || errorMessage.toLowerCase().includes('actual')) {
        setCurrentPasswordError('La contraseña actual es incorrecta');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <Header 
        showBackButton={true}
        onBackClick={() => navigateTo('clientList')}
        title="Mi perfil"
      />
      
      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-section-header">
            <img src="/img/user-icon.png" alt="" className="profile-section-icon" />
            <h3 className="profile-section-title">Información personal</h3>
          </div>

          <div className="profile-avatar-container">
            <div className="profile-avatar-large">
              {getInitials(user?.name || 'Usuario')}
            </div>
            <div className="profile-avatar-info">
              <button className="btn-change-photo">
                Cambiar foto
              </button>
              <span className="avatar-hint">máx 500kb (2MB)</span>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-label">Nombre completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFullNameError('');
                  setProfileSuccessMessage('');
                }}
                className={`profile-input ${fullNameError ? 'error' : ''}`}
                placeholder="Malena Cañizales Alonso"
                disabled={isUpdatingProfile}
              />
              {fullNameError && (
                <span className="profile-input-error">{fullNameError}</span>
              )}
            </div>

            <div className="profile-form-group">
              <label className="profile-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setProfileSuccessMessage('');
                }}
                className={`profile-input ${emailError ? 'error' : ''}`}
                placeholder="Email"
                disabled={isUpdatingProfile}
              />
              {emailError && (
                <span className="profile-input-error">{emailError}</span>
              )}
            </div>
          </div>

          {profileSuccessMessage && (
            <div className="profile-success-message">{profileSuccessMessage}</div>
          )}

          <div className="profile-form-actions">
            <button 
              className="profile-btn-update" 
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-section-header">
            <img src="/img/lock-icon.png" alt="" className="profile-section-icon lock-icon" />
            <h3 className="profile-section-title">Contraseña</h3>
          </div>

          <div className="profile-form-row password-row">
            <div className="profile-form-group">
              <label className="profile-label">Contraseña actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setCurrentPasswordError('');
                }}
                className={`profile-input ${currentPasswordError ? 'error' : ''}`}
                placeholder="************"
                disabled={isLoading}
              />
              {currentPasswordError && (
                <span className="profile-input-error">{currentPasswordError}</span>
              )}
            </div>

            <div className="profile-form-group">
              <label className="profile-label">Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setNewPasswordError('');
                }}
                className={`profile-input ${newPasswordError ? 'error' : ''}`}
                placeholder="************"
                disabled={isLoading}
              />
              {newPasswordError && (
                <span className="profile-input-error">{newPasswordError}</span>
              )}
            </div>

            <div className="profile-form-group">
              <label className="profile-label">Confirmar nueva contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError('');
                }}
                className={`profile-input ${confirmPasswordError ? 'error' : ''}`}
                placeholder="************"
                disabled={isLoading}
              />
              {confirmPasswordError && (
                <span className="profile-input-error">{confirmPasswordError}</span>
              )}
            </div>
          </div>

          {error && <div className="profile-error-message">{error}</div>}
          {successMessage && <div className="profile-success-message">{successMessage}</div>}

          <div className="profile-form-actions">
            <button 
              className="profile-btn-cancel" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              className="profile-btn-update" 
              onClick={handleUpdatePassword}
              disabled={isLoading}
            >
              {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

