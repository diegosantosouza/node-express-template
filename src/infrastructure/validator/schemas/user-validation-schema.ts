import { Gender, Roles } from '@/domain/models/user';
import { z } from 'zod';

export const UserCreateSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    birthDate: z.coerce.date().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    roles: z.array(z.nativeEnum(Roles)),
    gender: z.nativeEnum(Gender).optional(),
  })
})
