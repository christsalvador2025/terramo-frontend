export interface Products {
  id: number;
  name: string;
  description?: string;
}

export interface SingleClient {
  id: string;
  company_name: string;
  company_photo?: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products: Products[];
  
  // Dashboard specific data
  measureGradings?: MeasureGrading[];
  stakeholderMeasureGradings?: StakeholderMeasureGrading[];
  stakeholderSelections?: StakeholderSelection[];
  esgComments?: Record<string, string>;
  dualEssentialityData?: any;
}

export interface Stakeholder {
  id: number;
  label: string;
  description?: string;
  category?: string;
}

export interface Measure {
  id: number;
  key: string;
  name: string;
  description?: string;
  category: 'Umwelt' | 'Gesellschaft' | 'Wirtschaft';
}

export interface MeasureGrading {
  key: string;
  prio: number;
  statusQuo: number;
  comment?: string;
}

export interface StakeholderMeasureGrading {
  stakeholder: number;
  gradings: {
    key: string;
    prio: number;
  }[];
}

export interface StakeholderSelection {
  stakeholderId: number;
  chosen: boolean;
}