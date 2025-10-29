import axiosInstance from '../utils/axios';
import { API_CONFIG } from '../config/api.config';
import { LoginRequest, LoginResponse, User } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  register: async (data: { name: string; email: string; password: string }): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE, data);
    return response.data;
  },
};

