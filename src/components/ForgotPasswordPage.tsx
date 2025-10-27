import React, { useState } from 'react';
import './ForgotPasswordPage.css';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Recuperar contraseña para:', email);
    // Aquí iría la lógica de recuperación
    // Volver a la página de login después de enviar
    onBack();
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-header">
        <img src="/img/logo_black.svg" alt="Siweb" className="forgot-brand-logo" />
      </div>

      <div className="forgot-password-content">
        <div className="forgot-password-card">
          <button 
            className="forgot-back-button" 
            onClick={onBack}
            type="button"
            aria-label="Cerrar"
          >
            ×
          </button>

          <h1 className="forgot-password-title">¿Olvidaste tu contraseña?.</h1>
          <p className="forgot-password-description">
            Introduzca la dirección de correo electrónico registrada
          </p>

          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
              type="text"
              className="forgot-password-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <button type="submit" className="forgot-password-button">
              Recuperar contraseña
            </button>
          </form>
        </div>

        <div className="forgot-password-illustration">
          <img src="/img/login-image.svg" alt="Ilustración" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

