import * as z from "zod";
const currentYear = new Date().getFullYear();

export const registerClientSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters long" })
    .max(65, { message: "Company name must be less than 100 characters" }),

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

  gender: z.enum(["male", "female", "diverse"]),

  year_of_birth: z
    .number()
    .int()
    .gte(1900)
    .lte(currentYear)
    .refine((year) => currentYear - year >= 18, {
      message: "You must be at least 18 years old",
    }),

  street: z
    .string()
    .min(2, { message: "Street must be at least 2 characters" })
    .max(100),

  zip_code: z
    .string()
    .min(2, { message: "ZIP code must be at least 2 characters" })
    .max(10),

  location: z.string().min(2).max(100),

  city: z.string().min(2).max(100),

  land: z
    .string()
    .length(2, { message: "Country code must be 2 characters (ISO 3166-1 alpha-2)" }),

  email: z.string().trim().email({ message: "Enter a valid email address" }),

  landline_number: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Enter a valid landline number",
    }),

  mobile_phone_number: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Enter a valid mobile phone number",
    }),

  product_ids: z
    .array(z.string().uuid(), {
      required_error: "At least one product ID is required",
    })
    .nonempty(),

  send_invitation: z.boolean(),
  is_active: z.boolean(),
  raw_token: z.string().uuid({ message: "Invalid UUID format" }),

  invitation_expires_days: z
    .number()
    .int()
    .gte(1)
    .lte(365, {
      message: "Invitation expiry must be between 1 and 365 days",
    }),

  miscellaneous: z.string().optional(),
});

export type TRegisterClientSchema = z.infer<typeof registerClientSchema>;


