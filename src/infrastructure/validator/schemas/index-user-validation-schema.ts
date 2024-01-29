import { Gender, Roles } from '@/domain/models/user';
import { z } from 'zod';


export const indexUserRules = z.object({
  query: z.object({
    email: z.string().email().optional(),
    roles: z.nativeEnum(Roles).optional(),
    gender: z.nativeEnum(Gender).optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  })
})
