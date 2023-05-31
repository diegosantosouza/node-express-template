export interface Decrypter<T = any> {
  decrypt: (ciphertext: string) => Promise<T>
}
