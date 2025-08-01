// lib/types/client.types.ts
import { FieldErrors } from 'react-hook-form'; // Import FieldErrors

export interface ClientAdminData {
  company_name: string;
  contact_person_first_name: string;
  contact_person_last_name: string;
  date: string;
  gender: 'male' | 'female' | 'diverse';
  year_of_birth: number;
  street: string;
  zip_code: string;
  location: string;
  city: string;
  land: string;
  email: string;
  landline_number: string;
  mobile_phone_number: string;
  product_ids: string[];
  send_invitation: boolean;
  raw_token: string;
  invitation_expires_days: number;
  miscellaneous?: string | null;
  company_photo?: string;
  average_rating?: number;
}

export interface ClientAdminResponseData extends ClientAdminData {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
}

// Corrected FormSectionProps
export interface FormSectionProps {
  // Use FieldErrors with the specific form data type (ClientAdminData)
  errors: FieldErrors<ClientAdminData>;
  register: any; // You might want to type this more strictly with UseFormRegister<ClientAdminData>
  watch: any;    // Use UseFormWatch<ClientAdminData>
  setValue: any; // Use UseFormSetValue<ClientAdminData>
  control: any;  // Use Control<ClientAdminData>
}

export interface ApiError {
  data?: {
    message: string;
    errors?: Record<string, string[]>;
  };
  status?: number;
  message?: string;
}
