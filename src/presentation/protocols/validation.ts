import { ErrorValidateType } from "@/data/protocols/validator/error-validate";

export interface Validation {
  execute: (input: any) => Validation.ValidationError
}

export namespace Validation {
  export type ValidationError =  ErrorValidateType | void
}
