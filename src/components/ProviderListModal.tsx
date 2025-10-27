import React, { useState } from 'react';
import './ProviderListModal.css';

interface ProviderListModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProviders: string[];
  onApply: (providers: string[]) => void;
}

const ProviderListModal: React.FC<ProviderListModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedProviders, 
  onApply 
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(selectedProviders);

  const allProviders = [
    { letter: 'A', items: ['AgileSoft Solutions', 'Active S.L'] },
    { letter: 'B', items: ['Bing Soft', 'Balance S.L'] },
    { letter: 'C', items: ['CloudWave'] },
    { letter: 'D', items: ['Digital Solutions'] },
    { letter: 'E', items: ['EcoTech Innovations'] },
    { letter: 'N', items: ['NextGen Systems'] },
    { letter: 'T', items: ['TechCorp Solutions'] },
  ];

  const toggleProvider = (provider: string) => {
    setSelected(prev =>
      prev.includes(provider)
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const handleReset = () => {
    setSelected([]);
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="provider-modal-overlay">
      <div className="provider-modal">
        <div className="provider-modal-header">
          <button className="provider-back-button" onClick={onClose}>
            <img src="/img/arrow-icon.png" alt="" className="provider-back-icon" />
          </button>
          <h2 className="provider-modal-title">Todos los proveedores</h2>
          <button className="provider-reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="provider-search-box">
          <img src="/img/search-icon.png" alt="" className="provider-search-icon" />
          <input
            type="text"
            className="provider-search-input"
            placeholder="Buscar por nombre, CIF, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="provider-list">
          {allProviders.map(group => (
            <div key={group.letter} className="provider-group">
              <div className="provider-group-letter">{group.letter}</div>
              {group.items.map(provider => (
                <div key={provider} className="provider-item">
                  <span className="provider-name">{provider}</span>
                  <label className="provider-checkbox">
                    <input
                      type="checkbox"
                      checked={selected.includes(provider)}
                      onChange={() => toggleProvider(provider)}
                    />
                    <span className="checkbox-custom"></span>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="provider-modal-footer">
          <button className="btn-provider-clear" onClick={handleReset}>
            Borrar filtros
          </button>
          <button className="btn-provider-apply" onClick={handleApply}>
            Aplicar filtros({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderListModal;

