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
  providerId: string;
  provider?: Provider;
  createdAt: string;
  updatedAt: string;
}

export interface Provider {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    clients: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  providerId?: string;
  providers?: string;
  status?: 'active' | 'inactive';
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  fields?: string;
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

export type ClientField = 'email' | 'phone' | 'provider' | 'date' | 'price' | 'status';

export interface FieldOption {
  key: ClientField;
  label: string;
  defaultVisible: boolean;
}

export const AVAILABLE_FIELDS: FieldOption[] = [
  { key: 'provider', label: 'Proveedor', defaultVisible: true },
  { key: 'email', label: 'Email', defaultVisible: true },
  { key: 'phone', label: 'Teléfono', defaultVisible: true },
  { key: 'date', label: 'Fecha', defaultVisible: true },
  { key: 'price', label: 'Precio', defaultVisible: true },
  { key: 'status', label: 'Estado', defaultVisible: true },
];
