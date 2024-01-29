import { Types } from "mongoose";
import { z } from "zod";

export const validIdRule = z.object({
  params: z.object({
    id: z.string().min(1).refine((value) => {
      try {
        return new Types.ObjectId(value)
      } catch (error) {
        return false
      }
    }, 'Invalid ObjectId')
  })
})

