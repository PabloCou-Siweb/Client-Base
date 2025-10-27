import React, { useState } from 'react';
import './ExportModal.css';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['xlsx']);

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleExport = () => {
    onExport(selectedFormats.join(','));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="export-modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>
        <button className="export-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="export-modal-header">
          <div className="export-icon">
            <img src="/img/export-icon.png" alt="" className="export-icon-img" />
          </div>
          <div className="export-text">
            <h3 className="export-title">Exportar base de datos</h3>
            <p className="export-description">
              Selecciona el formato y opcions de exportación
            </p>
          </div>
        </div>

        <div className="export-formats">
          <button
            className={`format-option ${selectedFormats.includes('xlsx') ? 'selected' : ''}`}
            onClick={() => toggleFormat('xlsx')}
          >
            <div className="check-dot"></div>
            <span>Excel (.xlsx)</span>
          </button>

          <button
            className={`format-option ${selectedFormats.includes('csv') ? 'selected' : ''}`}
            onClick={() => toggleFormat('csv')}
          >
            <div className="check-dot"></div>
            <span>CSV (.csv)</span>
          </button>

          <button
            className={`format-option ${selectedFormats.includes('pdf') ? 'selected' : ''}`}
            onClick={() => toggleFormat('pdf')}
          >
            <div className="check-dot"></div>
            <span>PDF (.pdf)</span>
          </button>
        </div>

        <div className="export-modal-actions">
          <button className="btn-export-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="btn-export-confirm" 
            onClick={handleExport}
            disabled={selectedFormats.length === 0}
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;

