import { Decrypter, Encrypter } from '@/data/protocols/cryptografy'
import * as jwt from 'jsonwebtoken'

const { JWT_SECRET = 'any_key' } = process.env

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string = JWT_SECRET) { }

  async encrypt(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret)
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
