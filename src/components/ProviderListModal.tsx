import React, { useState, useEffect } from 'react';
import './ProviderListModal.css';
import { providerService } from '../services/provider.service';
import { Provider } from '../types';

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
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProviders();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(selectedProviders);
  }, [selectedProviders]);

  const loadProviders = async () => {
    try {
      setIsLoading(true);
      const data = await providerService.getProviders();
      setProviders(data);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupProvidersByLetter = () => {
    const filtered = providers.filter(p => 
      search === '' || 
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    const grouped: { [key: string]: string[] } = {};
    
    filtered.forEach(provider => {
      const firstLetter = provider.name[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(provider.name);
    });

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        letter,
        items: grouped[letter].sort()
      }));
  };

  const allProviders = groupProvidersByLetter();

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
          {isLoading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              Cargando proveedores...
            </div>
          ) : allProviders.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              {search ? 'No se encontraron proveedores' : 'No hay proveedores disponibles'}
            </div>
          ) : (
            allProviders.map(group => (
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
            ))
          )}
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

