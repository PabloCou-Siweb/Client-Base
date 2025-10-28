import React, { useState } from 'react';
import './ClientListPage.css';
import Header from './Header';
import FilterSidebar from './FilterSidebar';
import ImportModal from './ImportModal';
import ExportModal from './ExportModal';
import { useNavigation } from '../contexts/NavigationContext';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  amount: number;
  status: 'Activo' | 'Inactivo';
}

const ClientListPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allClients: Client[] = [
    { id: 1, name: 'TechCorp Solutions', email: 'techcorpsolutions@gmail.com', phone: '+34 952 59 32 30', date: '01/02/2025', amount: 1000, status: 'Activo' },
    { id: 2, name: 'CloudWave Solutions', email: 'support@cloudwavesolutions.com', phone: '+34 915 43 21 22', date: '18/07/2025', amount: 3000, status: 'Activo' },
    { id: 3, name: 'DataNest Innovations', email: 'info@datanestinnovations.com', phone: '+34 981 10 96 87', date: '22/10/2025', amount: 2500, status: 'Activo' },
    { id: 4, name: 'TechCorp Solutions', email: 'techcorpsolutions@gmail.com', phone: '+34 952 59 32 30', date: '01/02/2025', amount: 1000, status: 'Inactivo' },
    { id: 5, name: 'NextGen Systems', email: 'nextgensystems@email.org', phone: '+34 608 96 10 90', date: '15/12/2025', amount: 5000, status: 'Activo' },
    { id: 6, name: 'SmartGrid Technologies', email: 'support@smartgridtech.com', phone: '+34 650 11 22 33', date: '30/01/2026', amount: 6750, status: 'Activo' },
    { id: 7, name: 'Visionary Designs', email: 'info@visionarydesigns.com', phone: '+34 690 88 99 00', date: '20/02/2026', amount: 3800, status: 'Activo' },
    { id: 8, name: 'TechCorp Solutions', email: 'techcorpsolutions@gmail.com', phone: '+34 952 59 32 30', date: '01/02/2025', amount: 1000, status: 'Inactivo' },
    { id: 9, name: 'EcoTech Innovations', email: 'hello@ecotechinnovations.com', phone: '+34 686 95 44 33', date: '25/04/2026', amount: 3300, status: 'Activo' },
    { id: 10, name: 'AgileSoft Solutions', email: 'agilesoftsolutions@email.com', phone: '+34 625 85 98 77', date: '12/05/2026', amount: 4600, status: 'Activo' },
    { id: 11, name: 'FutureTech Corp', email: 'contact@futuretech.com', phone: '+34 644 77 88 99', date: '05/06/2026', amount: 5200, status: 'Activo' },
    { id: 12, name: 'MetaSolutions Inc', email: 'info@metasolutions.com', phone: '+34 677 11 22 33', date: '18/06/2026', amount: 4100, status: 'Inactivo' },
    { id: 13, name: 'DigitalWorks Pro', email: 'support@digitalworkspro.com', phone: '+34 655 99 00 11', date: '22/07/2026', amount: 3700, status: 'Activo' },
    { id: 14, name: 'InnovateLab', email: 'hello@innovatelab.com', phone: '+34 688 44 55 66', date: '30/07/2026', amount: 2900, status: 'Activo' },
    { id: 15, name: 'ByteForce Systems', email: 'contact@byteforce.com', phone: '+34 622 33 44 55', date: '10/08/2026', amount: 5500, status: 'Activo' },
    { id: 16, name: 'SmartCode Ltd', email: 'info@smartcode.com', phone: '+34 611 22 33 44', date: '25/08/2026', amount: 4300, status: 'Inactivo' },
    { id: 17, name: 'TechVision Global', email: 'support@techvision.com', phone: '+34 699 88 77 66', date: '05/09/2026', amount: 6200, status: 'Activo' },
    { id: 18, name: 'CloudMasters Inc', email: 'hello@cloudmasters.com', phone: '+34 633 55 66 77', date: '15/09/2026', amount: 3400, status: 'Activo' },
    { id: 19, name: 'DataStream Pro', email: 'contact@datastream.com', phone: '+34 666 11 22 33', date: '28/09/2026', amount: 4800, status: 'Activo' },
    { id: 20, name: 'NexusHub Technologies', email: 'info@nexushub.com', phone: '+34 677 99 00 11', date: '10/10/2026', amount: 5100, status: 'Inactivo' },
    { id: 21, name: 'QuantumSoft Solutions', email: 'support@quantumsoft.com', phone: '+34 644 88 99 00', date: '20/10/2026', amount: 6500, status: 'Activo' },
    { id: 22, name: 'AlphaCode Systems', email: 'hello@alphacode.com', phone: '+34 655 77 88 99', date: '05/11/2026', amount: 3900, status: 'Activo' },
  ];

  const totalClients = allClients.length;
  const totalPages = Math.ceil(totalClients / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const clients = allClients.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedClients([]); // Limpiar selección al cambiar de página
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedClients([]); // Limpiar selección al cambiar de página
    }
  };

  const toggleClientSelection = (id: number) => {
    setSelectedClients(prev => 
      prev.includes(id) ? prev.filter(clientId => clientId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(c => c.id));
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
              placeholder="Buscar por nombre, CIF, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <button className="btn-primary-action">
              <img src="/img/add-icon.png" alt="" className="btn-icon" />
              Nueva base
            </button>
          </div>
        </div>

        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th className="th-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedClients.length === clients.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="th-sortable">PROVEEDOR</th>
                <th className="th-sortable">FECHA</th>
                <th className="th-sortable">CANTIDAD</th>
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
                  <td>{client.date}</td>
                  <td>{client.amount.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${client.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button 
                      className="btn-action" 
                      aria-label="Ver detalles"
                      onClick={() => navigateTo('clientDetails')}
                    >
                      <img src="/img/eye-icon.png" alt="" className="action-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="client-list-footer">
          <div className="footer-info">
            Mostrando {startIndex + 1} a {Math.min(endIndex, totalClients)} de {totalClients} resultados
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
        onApplyFilters={(filters) => {
          console.log('Filtros aplicados:', filters);
          setShowFilters(false);
        }}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(file) => {
          console.log('Archivo importado:', file.name);
          setShowImportModal(false);
        }}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={(format) => {
          console.log('Exportar como:', format);
          setShowExportModal(false);
        }}
      />
    </div>
  );
};

export default ClientListPage;

