export interface User {
  id: number;
  role_id?: number;
  role?: string;
  name: string;
  email: string;
  phone?: string;
  status: string | number;
  roles?: { id: number; name: string }[];
  role_name?: string;
  email_verified_at?: string | null;
  created_at?: string;
  member?: {
    id: number;
    nik_nisn: string;
    id_type: string;
    phone: string;
    address: string;
    birth_date: string;
    age: number;
    age_category: string;
    guardian_name: string | null;
    verification_status: string;
    verified_at: string | null;
  };
}

export interface CreateUserPayload {
  role_id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  status: number;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export interface FormCreateRoleProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  initialData?: Role;
  roleName: string;
  setRoleName: (name: string) => void;
  isSubmitting: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  nik_nisn: string;
  id_type: string;
  phone: string;
  address: string;
  birth_date: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
