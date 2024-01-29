export type ErrorValidateType = Array<
{
  path: Array<string | number>,
  message: string
  code?: string,
  expected?: string,
  received?: string,
}>
