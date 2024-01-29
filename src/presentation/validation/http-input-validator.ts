import { Validator } from "@/data/protocols/validator/parse";
import { Validation } from "@/presentation/protocols/validation";

export class HttpInputValidator implements Validation {
  constructor(private readonly validator: Validator) {}

  execute(input: any): Validation.ValidationError {
      const errorValidate = this.validator.parse(input);
      if (errorValidate.length > 0) {
        return errorValidate
      }
  }
}
