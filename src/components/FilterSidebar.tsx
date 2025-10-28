import React, { useState } from 'react';
import './FilterSidebar.css';
import ProviderListModal from './ProviderListModal';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>(['Tech Solutions', 'CloudWave']);
  const [selectedDate, setSelectedDate] = useState('06/2/2025');
  const [dateFilter, setDateFilter] = useState('esta-semana');
  const [selectedStatus, setSelectedStatus] = useState('Activo');
  const [priceRange, setPriceRange] = useState(5);
  const [showProviderList, setShowProviderList] = useState(false);

  const mainProviders = selectedProviders.slice(0, 4);

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev =>
      prev.includes(provider)
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const handleReset = () => {
    setSelectedProviders([]);
    setSelectedDate('');
    setDateFilter('');
    setSelectedStatus('Activo');
    setPriceRange(5);
  };

  const handleApply = () => {
    onApplyFilters({
      providers: selectedProviders,
      date: selectedDate,
      dateFilter,
      status: selectedStatus,
      priceRange
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="filter-overlay" onClick={onClose}></div>
      <div className="filter-sidebar">
        <div className="filter-header">
          <button className="filter-back" onClick={onClose}>
            <img src="/img/arrow-icon.png" alt="" className="filter-back-icon" />
          </button>
          <h2 className="filter-title">Filtros</h2>
          <button className="filter-reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="filter-content">
          {/* Proveedor */}
          <div className="filter-section">
            <div className="filter-section-header">
              <label className="filter-label">Proveedor</label>
              <button 
                className="filter-see-all"
                onClick={() => setShowProviderList(true)}
              >
                Ver todos &gt;
              </button>
            </div>
            <div className="filter-chips">
              {selectedProviders.length > 0 ? (
                selectedProviders.map(provider => (
                  <button
                    key={provider}
                    className="filter-chip selected"
                    onClick={() => toggleProvider(provider)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {provider}
                  </button>
                ))
              ) : (
                <div className="no-providers-selected">No hay proveedores seleccionados</div>
              )}
            </div>
          </div>

          {/* Fecha */}
          <div className="filter-section">
            <label className="filter-label">Fecha</label>
            <div className="filter-date-input">
              <input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
              <img src="/img/date-icon.png" alt="" className="calendar-icon" />
            </div>
            <div className="filter-date-buttons">
              <button
                className={`date-button ${dateFilter === 'hoy' ? 'active' : ''}`}
                onClick={() => setDateFilter('hoy')}
              >
                Hoy
              </button>
              <button
                className={`date-button ${dateFilter === 'esta-semana' ? 'active' : ''}`}
                onClick={() => setDateFilter('esta-semana')}
              >
                Esta semana
              </button>
              <button
                className={`date-button ${dateFilter === 'este-mes' ? 'active' : ''}`}
                onClick={() => setDateFilter('este-mes')}
              >
                Este mes
              </button>
            </div>
          </div>

          {/* Estado */}
          <div className="filter-section">
            <label className="filter-label">Estado</label>
            <div className="filter-select">
              <div className="status-indicator activo"></div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="select-input"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Proveedor (rango) */}
          <div className="filter-section">
            <div className="filter-section-header">
              <label className="filter-label">Proveedor</label>
              <span className="filter-range-value">0 - {priceRange * 2}k</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="filter-range"
            />
          </div>
        </div>

        <div className="filter-footer">
          <button className="btn-clear-filters" onClick={handleReset}>
            Borrar filtros
          </button>
          <button className="btn-apply-filters" onClick={handleApply}>
            Aplicar filtros({selectedProviders.length})
          </button>
        </div>

        <ProviderListModal
          isOpen={showProviderList}
          onClose={() => setShowProviderList(false)}
          selectedProviders={selectedProviders}
          onApply={(providers) => {
            setSelectedProviders(providers);
            setShowProviderList(false);
          }}
        />
      </div>
    </>
  );
};

export default FilterSidebar;

