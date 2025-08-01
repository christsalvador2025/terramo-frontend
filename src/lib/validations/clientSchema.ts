import * as z from "zod";

const currentYear = new Date().getFullYear();

export const registerClientSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters long" })
    .max(65, { message: "Company name must be less than 65 characters" }),

  contact_person_first_name: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name must be less than 50 characters long" }),

  contact_person_last_name: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be less than 50 characters long" }),

  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Use YYYY-MM-DD",
    }),

  year_of_birth: z
    .number()
    .int()
    .gte(1900, { message: "Year must be 1900 or later" })
    .lte(currentYear, { message: `Year cannot be later than ${currentYear}` })
    .refine((year) => currentYear - year >= 18, {
      message: "Must be at least 18 years old",
    }),

  street: z
    .string()
    .trim()
    .min(2, { message: "Street must be at least 2 characters" })
    .max(100, { message: "Street must be less than 100 characters" }),

  zip_code: z
    .string()
    .trim()
    .min(2, { message: "ZIP code must be at least 2 characters" })
    .max(10, { message: "ZIP code must be less than 10 characters" }),

  location: z
    .string()
    .trim()
    .min(2, { message: "Location must be at least 2 characters" })
    .max(100, { message: "Location must be less than 100 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" }),

  landline_number: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Enter a valid landline number",
    }),

  mobile_phone_number: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Enter a valid mobile phone number",
    }),

  product_ids: z
    .array(z.string().uuid("Invalid product ID format"))
    .min(1, { message: "At least one product must be selected" }),

  send_invitation: z.boolean(),

  raw_token: z.string().uuid({ message: "Invalid token format" }),

  invitation_expires_days: z
    .number()
    .int()
    .min(1, { message: "Must be at least 1 day" })
    .max(365, { message: "Cannot exceed 365 days" }),

  miscellaneous: z.string().optional().nullable(),
  company_photo: z.string().optional(),
  average_rating: z.number().optional(),
});

export type TRegisterClientSchema = z.infer<typeof registerClientSchema>;