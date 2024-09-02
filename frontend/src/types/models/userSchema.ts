import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const loginShcema = emailSchema.extend({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signupSchema = loginShcema.extend({
  name: z.string().min(1, 'Full name is required'),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid birthdate format, expected YYYY-MM-DD'),
});
