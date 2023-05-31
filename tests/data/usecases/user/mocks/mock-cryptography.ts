import { faker } from '@faker-js/faker'
import { Hasher, HashComparer, Encrypter, Decrypter } from '@/data/protocols/cryptografy'


export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext!: string

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext!: string
  digest!: string
  isValid = true

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid()
  payload!: object

  async encrypt(payload: object): Promise<string> {
    this.payload = payload
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext!: string

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}
