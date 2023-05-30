import { Decrypter } from '@/data/protocols/cryptografy'
import { LoadAccountByToken } from '@/domain/usecases/user'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
  ) { }

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    try {
      const token = await this.decrypter.decrypt(accessToken)
      if (token) {
        const decodedToken = JSON.parse(token)
        if (role && !decodedToken.roles.includes(role)) {
          return null;
        }
        return decodedToken as LoadAccountByToken.Result
      }
    } catch (error) {
      return null
    }
    return null
  }
}
