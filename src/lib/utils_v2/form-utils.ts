export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters except +
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // If it starts with +, keep it
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // Otherwise, add + if it's not empty
  return cleaned ? `+${cleaned}` : '';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(phone);
};

export const generateToken = (): string => {
  return crypto.randomUUID();
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};