import { Decrypter, Encrypter } from '@/data/protocols/cryptografy'
import * as jwt from 'jsonwebtoken'

const { JWT_SECRET = 'any_key' } = process.env
const expiresIn = '1d'
export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string = JWT_SECRET) { }

  
  async encrypt(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn })
  }
  
  async decrypt(ciphertext: string): Promise<string> {
    const decodedToken = jwt.verify(ciphertext, this.secret) as any
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp >= currentTimestamp) {
      return decodedToken;
    }
    return '';
  }
}
