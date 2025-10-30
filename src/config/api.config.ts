export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
    },
    CLIENTS: {
      LIST: '/clients',
      DETAIL: (id: number) => `/clients/${id}`,
      CREATE: '/clients',
      UPDATE: (id: number) => `/clients/${id}`,
      DELETE: (id: number) => `/clients/${id}`,
      DELETE_MULTIPLE: '/clients/delete-multiple',
    },
    PROVIDERS: {
      LIST: '/providers',
      DETAIL: (id: number) => `/providers/${id}`,
      CREATE: '/providers',
      UPDATE: (id: number) => `/providers/${id}`,
      DELETE: (id: number) => `/providers/${id}`,
    },
    IMPORT: '/import',
    EXPORT: '/export',
  },
};

