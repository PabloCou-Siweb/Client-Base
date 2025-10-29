import axiosInstance from '../utils/axios';
import { API_CONFIG } from '../config/api.config';
import { Client, PaginatedResponse, PaginationParams } from '../types';

export const clientService = {
  getClients: async (params: PaginationParams = {}): Promise<PaginatedResponse<Client>> => {
    const response = await axiosInstance.get<PaginatedResponse<Client>>(
      API_CONFIG.ENDPOINTS.CLIENTS.LIST,
      { params }
    );
    return response.data;
  },

  getClientById: async (id: number): Promise<Client> => {
    const response = await axiosInstance.get<Client>(
      API_CONFIG.ENDPOINTS.CLIENTS.DETAIL(id)
    );
    return response.data;
  },

  createClient: async (data: Partial<Client>): Promise<Client> => {
    const response = await axiosInstance.post<Client>(
      API_CONFIG.ENDPOINTS.CLIENTS.CREATE,
      data
    );
    return response.data;
  },

  updateClient: async (id: number, data: Partial<Client>): Promise<Client> => {
    const response = await axiosInstance.put<Client>(
      API_CONFIG.ENDPOINTS.CLIENTS.UPDATE(id),
      data
    );
    return response.data;
  },

  deleteClient: async (id: number): Promise<void> => {
    await axiosInstance.delete(API_CONFIG.ENDPOINTS.CLIENTS.DELETE(id));
  },

  deleteMultipleClients: async (ids: number[]): Promise<void> => {
    await axiosInstance.post(API_CONFIG.ENDPOINTS.CLIENTS.DELETE_MULTIPLE, { ids });
  },
};

