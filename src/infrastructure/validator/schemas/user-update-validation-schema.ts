import { Gender, Roles } from '@/domain/models/user';
import { z } from 'zod';
import { validIdRule } from './id-validation-schema';

export const userUpdateSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    birthDate: z.coerce.date().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    roles: z.array(z.nativeEnum(Roles)).optional(),
    gender: z.nativeEnum(Gender).optional(),
  })
}).merge(validIdRule)
