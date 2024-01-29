import { ErrorValidateType } from "./error-validate";

export interface Validator {
  parse: (input: any) => ErrorValidateType
}
