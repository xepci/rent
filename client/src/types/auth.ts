export type AdminUser = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export type AdminAuthContextType = {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, admin?: AdminUser | null) => Promise<void>;
  logout: () => void;
  refreshAdmin: () => Promise<void>;
};
