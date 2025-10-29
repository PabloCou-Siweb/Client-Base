import React, { useEffect, useState } from 'react';
import './ClientDetailsPage.css';
import Header from './Header';
import { useNavigation } from '../contexts/NavigationContext';
import { clientService } from '../services/client.service';
import { Client } from '../types';

interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  price: string;
  status: string;
  createdAt: string;
}

const ClientDetailsPage: React.FC = () => {
  const { navigateTo, selectedClientId } = useNavigation();
  const [client, setClient] = useState<Client | null>(null);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedClientId) {
      fetchClientDetails();
    }
  }, [selectedClientId]);

  const fetchClientDetails = async () => {
    if (!selectedClientId) return;

    setIsLoading(true);
    setError('');

    try {
      const clientData = await clientService.getClientById(selectedClientId);
      setClient(clientData);

      const mockCustomers: CustomerData[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `555-${String(i + 1).padStart(4, '0')}`,
        price: `${(Math.random() * 1000 + 100).toFixed(2)} €`,
        status: i % 3 === 0 ? 'Activo' : 'Inactivo',
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('es-ES'),
      }));

      setCustomers(mockCustomers);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los detalles del cliente');
      console.error('Error fetching client details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="client-details-page">
      <Header 
        showBackButton={true}
        onBackClick={() => navigateTo('clientList')}
      />

      <div className="client-details-container">
        {isLoading && (
          <div className="loading-message" style={{ padding: '60px', textAlign: 'center' }}>
            Cargando detalles...
          </div>
        )}

        {error && (
          <div className="error-message-list" style={{ margin: '40px' }}>
            {error}
          </div>
        )}

        {!isLoading && !error && client && (
          <>
            <div className="client-info-header" style={{ 
              padding: '20px 40px', 
              backgroundColor: '#f8f9fa', 
              borderBottom: '1px solid #e5e5e5',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 500, color: '#333' }}>
                {client.name}
              </h2>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
                {client.email} • {client.phone}
              </p>
            </div>

            <div className="excel-table-wrapper">
              <table className="excel-table">
                <thead>
                  <tr className="excel-header-row">
                    <th className="excel-col-header">A</th>
                    <th className="excel-col-header">B</th>
                    <th className="excel-col-header">C</th>
                    <th className="excel-col-header">D</th>
                    <th className="excel-col-header">E</th>
                    <th className="excel-col-header">F</th>
                    <th className="excel-col-header">G</th>
                  </tr>
                  <tr className="excel-title-row">
                    <th colSpan={7} className="excel-title">Customer Database - {client.name}</th>
                  </tr>
                  <tr className="excel-columns-row">
                    <th className="excel-row-number">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="excel-row-number">{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.price}</td>
                      <td>{customer.status}</td>
                      <td>{customer.createdAt}</td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        No hay datos de clientes disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!isLoading && !error && !client && (
          <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
            No se ha seleccionado ningún cliente
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsPage;
