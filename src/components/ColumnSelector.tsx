import React, { useState, useRef, useEffect } from 'react';
import './ColumnSelector.css';
import { ClientField, AVAILABLE_FIELDS } from '../types';

interface ColumnSelectorProps {
  visibleColumns: ClientField[];
  onColumnsChange: (columns: ClientField[]) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ 
  visibleColumns, 
  onColumnsChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleColumn = (field: ClientField) => {
    if (visibleColumns.includes(field)) {
      // Al menos debe quedar 1 columna visible
      if (visibleColumns.length > 1) {
        onColumnsChange(visibleColumns.filter(col => col !== field));
      }
    } else {
      onColumnsChange([...visibleColumns, field]);
    }
  };

  const selectAll = () => {
    onColumnsChange(AVAILABLE_FIELDS.map(f => f.key));
  };

  return (
    <div className="column-selector" ref={dropdownRef}>
      <button 
        className="btn-toolbar" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/img/note-icon.png" alt="" className="btn-icon" />
        Columnas
      </button>

      {isOpen && (
        <div className="column-dropdown">
          <div className="column-dropdown-header">
            <h4>Columnas visibles</h4>
            <button onClick={selectAll} className="btn-text">Todas</button>
          </div>

          <div className="column-list">
            {AVAILABLE_FIELDS.map(field => (
              <label key={field.key} className="column-item">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(field.key)}
                  onChange={() => toggleColumn(field.key)}
                />
                <span className="checkbox-custom"></span>
                <span className="column-label">{field.label}</span>
              </label>
            ))}
          </div>

          <div className="column-dropdown-footer">
            <span className="column-count">
              {visibleColumns.length} de {AVAILABLE_FIELDS.length} seleccionadas
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;

