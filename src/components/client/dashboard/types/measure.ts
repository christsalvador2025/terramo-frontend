export interface Measure {
  id: number;
  key: string;
  name: string;
  category: "Umwelt" | "Gesellschaft" | "Wirtschaft";
  description?: string;
  created_at: string;
  updated_at: string;
}