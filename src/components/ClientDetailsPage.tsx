import React from 'react';
import './ClientDetailsPage.css';
import Header from './Header';
import { useNavigation } from '../contexts/NavigationContext';

const ClientDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const customers = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '555-1234', city: 'New York', city2: 'New York', country: 'Untin States' },
    { id: 2, name: 'Lisa Brown', email: 'lisa.brown@example.com', phone: '555-5678', city: 'Los Angeles', city2: 'Chicago', country: 'Untte States' },
    { id: 3, name: 'Michael Johnson', email: 'sarah.davis@example.com', phone: '555-6718', city: 'Houston', city2: 'Houston', country: 'Untie States' },
    { id: 4, name: 'James Wilson', email: 'james.wilson@example.com', phone: '551-1111', city: 'Phoenix', city2: 'Phoenix', country: 'Unite States' },
    { id: 5, name: 'Amanda Martinez', email: 'amanda.martinezexample.com', phone: '5576', city: 'San Antonio', city2: 'San Diego', country: 'Unite States' },
    { id: 6, name: 'Robert Taylor', email: 'robert.taylor@example.com', phone: '551-811', city: 'Dallas', city2: 'Dallas', country: 'Unite States' },
    { id: 7, name: 'Linda White', email: 'linda.white@example.com', phone: '555-937', city: 'Austin', city2: 'Austin', country: 'Unite States' },
    { id: 8, name: 'William Anderson', email: 'william.anderson@example', phone: '556-2111', city: 'San Jose', city2: 'San Jose', country: 'Unite States' },
    { id: 9, name: 'Emily Harris', email: 'emily.harris@example.com', phone: '555-222', city: 'Columbus', city2: 'Columbus', country: 'Unite States' },
    { id: 10, name: 'David Clark', email: 'david.clark@example.com', phone: '555-133', city: 'San Jose', city2: 'Indianapolis', country: 'Unite States' },
    { id: 11, name: 'Emma Thompson', email: 'emma.thompson@example', phone: '556-095', city: 'Indianapolis', city2: '', country: 'Unite States' },
  ];

  return (
    <div className="client-details-page">
      <Header 
        showBackButton={true}
        onBackClick={() => navigateTo('clientList')}
      />

      <div className="client-details-container">
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
                <th className="excel-col-header">E</th>
              </tr>
              <tr className="excel-title-row">
                <th colSpan={7} className="excel-title">Customer Database</th>
              </tr>
              <tr className="excel-columns-row">
                <th className="excel-row-number">D</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="excel-row-number">{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.city}</td>
                  <td>{customer.city2}</td>
                  <td>{customer.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;

