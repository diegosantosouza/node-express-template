import { ErrorValidateType } from '@/data/protocols/validator/error-validate';
import { Validator } from '@/data/protocols/validator/parse';
import { z } from 'zod';

export class ZodAdapter implements Validator {
  constructor(private readonly schema: z.ZodObject<any, any, any>) {}

  parse(input: any): ErrorValidateType {
   const inputValidation =  this.schema.safeParse(input)

   if(!inputValidation.success) {
    const errors = inputValidation.error.errors.map((error) => ({
      path: error.path,
      message: error.message,
      code: error.code ?? '',
      expected: 'expected' in error ? error.expected?.toString() : '',
      received: 'received' in error ? error.received?.toString() : '',
    }))
    return errors
   }
   return []
  }
}
