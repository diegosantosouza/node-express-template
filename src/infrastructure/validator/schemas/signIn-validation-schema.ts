import { z } from 'zod';

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  })
})
