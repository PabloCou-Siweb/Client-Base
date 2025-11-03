import axiosInstance from '../utils/axios';
import { API_CONFIG } from '../config/api.config';
import { Provider } from '../types';

export const providerService = {
  getProviders: async (): Promise<Provider[]> => {
    const response = await axiosInstance.get<Provider[]>(
      API_CONFIG.ENDPOINTS.PROVIDERS.LIST
    );
    return response.data;
  },

  getProviderById: async (id: string): Promise<Provider> => {
    const response = await axiosInstance.get<Provider>(
      `${API_CONFIG.ENDPOINTS.PROVIDERS.LIST}/${id}`
    );
    return response.data;
  },

  createProvider: async (data: { name: string }): Promise<Provider> => {
    const response = await axiosInstance.post<Provider>(
      API_CONFIG.ENDPOINTS.PROVIDERS.CREATE,
      data
    );
    return response.data;
  },

  updateProvider: async (id: string, data: { name: string }): Promise<Provider> => {
    const response = await axiosInstance.put<Provider>(
      `${API_CONFIG.ENDPOINTS.PROVIDERS.LIST}/${id}`,
      data
    );
    return response.data;
  },

  deleteProvider: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.PROVIDERS.LIST}/${id}`);
  },
};

