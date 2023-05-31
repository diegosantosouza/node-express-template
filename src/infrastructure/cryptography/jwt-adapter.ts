import { Decrypter, Encrypter } from '@/data/protocols/cryptografy'
import * as jwt from 'jsonwebtoken'

const { JWT_SECRET = 'any_key' } = process.env
export class JwtAdapter<T = any> implements Encrypter, Decrypter<T> {
  constructor(
    private readonly secret: string = JWT_SECRET,
    private readonly expiresIn: string = '1d',
  ) { }

  
  async encrypt(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }
  
  async decrypt(ciphertext: string): Promise<T | any> {
    const decodedToken = jwt.verify(ciphertext, this.secret) as any
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp >= currentTimestamp) {
      return decodedToken;
    }
    return '';
  }
}
