import { z } from 'zod';

// This is a Exampleeeee
const geoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: geoSchema,
});

const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: addressSchema,
  phone: z.string(),
  website: z.string(),
  company: companySchema,
});

export type IAddress = z.infer<typeof addressSchema>;
export type ICompany = z.infer<typeof companySchema>;
export type IUser = z.infer<typeof userSchema>;
