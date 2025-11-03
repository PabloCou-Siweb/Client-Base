import React, { useState, useEffect } from 'react';
import './ClientListPage.css';
import Header from './Header';
import FilterSidebar from './FilterSidebar';
import ImportModal from './ImportModal';
import ExportModal from './ExportModal';
import { useNavigation } from '../contexts/NavigationContext';
import { Client } from '../types';
import { clientService } from '../services/client.service';
import { importExportService } from '../services/import-export.service';
import { PaginationParams } from '../types';

const ClientListPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<PaginationParams>({});
  const itemsPerPage = 10;

  useEffect(() => {
    fetchClients();
  }, [currentPage, searchTerm, JSON.stringify(filters)]);

  const fetchClients = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const params: PaginationParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        ...filters,
      };

      const response = await clientService.getClients(params);
      
      const clientsData = (response as any).clients || response.data || [];
      setClients(clientsData);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalClients(response.pagination?.total || 0);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los clientes. Asegúrate de que el backend esté corriendo en http://localhost:5000');
      setClients([]);
      setTotalPages(1);
      setTotalClients(0);
      console.error('Error fetching clients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedClients([]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedClients([]);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const toggleClientSelection = (id: number) => {
    setSelectedClients(prev => 
      prev.includes(id) ? prev.filter(clientId => clientId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (!clients || clients.length === 0) return;
    
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(c => c.id));
    }
  };

  const handleImport = async (file: File) => {
    try {
      setIsLoading(true);
      await importExportService.importClients(file);
      setShowImportModal(false);
      await fetchClients();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al importar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format: 'excel' | 'csv' | 'pdf') => {
    try {
      const blob = await importExportService.exportClients(format, filters);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clientes.${format === 'excel' ? 'xlsx' : format}`;
      link.click();
      window.URL.revokeObjectURL(url);
      setShowExportModal(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al exportar clientes');
    }
  };

  return (
    <div className="client-list-page">
      <Header />

      <div className="client-list-container">
        <div className="client-list-toolbar">
          <div className="search-box">
            <img src="/img/search-icon.png" alt="" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nombre, email, teléfono..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <button className="btn-toolbar" onClick={() => setShowExportModal(true)}>
              <img src="/img/export-icon.png" alt="" className="btn-icon" />
              Exportar
            </button>
            <button className="btn-toolbar" onClick={() => setShowImportModal(true)}>
              <img src="/img/import-icon.png" alt="" className="btn-icon" />
              Importar
            </button>
            <button className="btn-toolbar" onClick={() => setShowFilters(true)}>
              <img src="/img/filter-icon.png" alt="" className="btn-icon" />
              Filtros
            </button>
          </div>
        </div>

        <div className="client-table-wrapper">
          {isLoading && <div className="loading-message">Cargando clientes...</div>}
          {error && <div className="error-message-list">{error}</div>}
          
          {!isLoading && !error && (
            <table className="client-table">
              <thead>
                <tr>
                  <th className="th-checkbox">
                    <input
                      type="checkbox"
                      checked={clients.length > 0 && selectedClients.length === clients.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="th-sortable">PROVEEDOR</th>
                  <th className="th-sortable">FECHA</th>
                  <th className="th-sortable">PRECIO</th>
                  <th className="th-sortable">ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                <tr key={client.id}>
                  <td className="td-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleClientSelection(client.id)}
                    />
                  </td>
                  <td className="td-provider">
                    <div className="provider-name">{client.name}</div>
                    <div className="provider-email">{client.email}</div>
                    <div className="provider-phone">{client.phone}</div>
                  </td>
                  <td>{new Date(client.createdAt).toLocaleDateString('es-ES')}</td>
                  <td>{client.price.toLocaleString()} €</td>
                  <td>
                    <span className={`status-badge ${client.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {client.status.toLowerCase() === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button 
                      className="btn-action" 
                      aria-label="Ver detalles"
                      onClick={() => navigateTo('clientDetails', client.id)}
                    >
                      <img src="/img/eye-icon.png" alt="" className="action-icon" />
                    </button>
                  </td>
                </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                      No se encontraron clientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="client-list-footer">
          <div className="footer-info">
            {totalClients > 0 ? (
              <>Mostrando {clients.length} de {totalClients} resultados (Página {currentPage} de {totalPages})</>
            ) : (
              <>0 resultados</>
            )}
          </div>
          <div className="footer-pagination">
            <button 
              className="btn-pagination" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <img src="/img/arrow-icon.png" alt="" className="arrow-left" />
              Anterior
            </button>
            <button 
              className="btn-pagination"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <img src="/img/arrow-icon.png" alt="" className="arrow-right" />
            </button>
          </div>
        </div>
      </div>

      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
            onApplyFilters={(appliedFilters) => {
              const transformedFilters: PaginationParams = {};
              
              if (appliedFilters.status && appliedFilters.status !== 'Todos') {
                transformedFilters.status = appliedFilters.status === 'Activo' ? 'active' : 'inactive';
              }

              if (appliedFilters.minPrice !== undefined && appliedFilters.minPrice > 0) {
                transformedFilters.minPrice = appliedFilters.minPrice * 2000;
              }

              if (appliedFilters.maxPrice !== undefined && appliedFilters.maxPrice > 0) {
                transformedFilters.maxPrice = appliedFilters.maxPrice * 2000;
              }

              // Filtro de proveedores
              if (appliedFilters.providers && appliedFilters.providers.length > 0) {
                transformedFilters.providers = appliedFilters.providers.join(',');
              }

              // Filtro de fecha
              if (appliedFilters.date) {
                // Convertir fecha de formato 'dd/mm/yyyy' a formato ISO 'yyyy-mm-dd'
                const dateParts = appliedFilters.date.split('/');
                if (dateParts.length === 3) {
                  const isoDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
                  
                  if (appliedFilters.dateFilter === 'hoy') {
                    transformedFilters.startDate = isoDate;
                    transformedFilters.endDate = isoDate;
                  } else if (appliedFilters.dateFilter === 'esta-semana') {
                    transformedFilters.startDate = isoDate;
                    const weekEnd = new Date(dateParts[2], parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
                    weekEnd.setDate(weekEnd.getDate() + 6);
                    transformedFilters.endDate = weekEnd.toISOString().split('T')[0];
                  } else if (appliedFilters.dateFilter === 'este-mes') {
                    transformedFilters.startDate = isoDate;
                    const monthEnd = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]), 0);
                    transformedFilters.endDate = monthEnd.toISOString().split('T')[0];
                  } else {
                    // Si no hay filtro de periodo, usar la fecha seleccionada
                    transformedFilters.startDate = isoDate;
                  }
                }
              }

              setFilters(transformedFilters);
              setCurrentPage(1);
              setShowFilters(false);
            }}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default ClientListPage;
