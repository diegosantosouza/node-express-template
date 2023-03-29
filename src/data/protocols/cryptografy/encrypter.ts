export interface Encrypter {
  encrypt: (payload: object) => Promise<string>
}
