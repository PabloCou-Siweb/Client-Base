import React, { useState, useRef } from 'react';
import './ImportModal.css';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="import-modal-overlay" onClick={handleCancel}>
      <div className="import-modal" onClick={(e) => e.stopPropagation()}>
        <button className="import-modal-close" onClick={handleCancel}>
          ×
        </button>

        <div className="import-modal-header">
          <div className="import-icon">
            <img src="/img/import-icon.png" alt="" className="import-icon-img" />
          </div>
          <div className="import-text">
            <h3 className="import-title">Importar base de datos</h3>
            <p className="import-description">
              Arrastra un archivo Excel o CSV para importar clientes
            </p>
          </div>
        </div>

        <div 
          className={`import-dropzone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="file-selected">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2FA8EC" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
              <p className="file-name">{selectedFile.name}</p>
              <button className="btn-remove-file" onClick={() => setSelectedFile(null)}>
                Quitar archivo
              </button>
            </div>
          ) : (
            <>
              <p className="dropzone-title">Arrastra tu archivo aquí</p>
              <p className="dropzone-formats">Formatos soportados .xlsx, .xls, .csv</p>
              <button className="btn-browse" onClick={handleBrowseClick}>
                Subir archivo
              </button>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        <div className="import-modal-actions">
          <button className="btn-import-cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button 
            className="btn-import-confirm" 
            onClick={handleImport}
            disabled={!selectedFile}
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;

