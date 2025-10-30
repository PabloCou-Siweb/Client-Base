export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  price: number;
  providerId: number;
  provider?: Provider;
  createdAt: string;
  updatedAt: string;
}

export interface Provider {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  providerId?: number;
  status?: 'active' | 'inactive';
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResponse<T> {
  data?: T[];
  clients?: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: any[];
}

