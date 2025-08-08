export interface Client {
  id: string;
  company_name: string;
  company_photo?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  website?: string;
  industry?: string;
  company_size?: string;
  measureGradings?: any[];
  stakeholderMeasureGradings?: any[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
