import axiosInstance from '../utils/axios';
import { API_CONFIG } from '../config/api.config';

export const importExportService = {
  importClients: async (file: File): Promise<{ imported: number; errors: any[] }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<{ imported: number; errors: any[] }>(
      API_CONFIG.ENDPOINTS.IMPORT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  exportClients: async (format: 'excel' | 'csv' | 'pdf', filters?: any): Promise<Blob> => {
    const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.EXPORT, {
      params: { format, ...filters },
      responseType: 'blob',
    });
    return response.data;
  },
};

