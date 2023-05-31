import { Decrypter } from '@/data/protocols/cryptografy'
import { Roles } from '@/domain/models/user';
import { LoadAccountByToken } from '@/domain/usecases/user'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter<LoadAccountByToken.Result>,
  ) { }

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    try {
      const token = await this.decrypter.decrypt(accessToken)
      if (token) {
        const tokenRoles = token.roles
        if (role && !tokenRoles.includes(role as Roles)) {
          return null;
        }
        return token
      }
    } catch (error) {
      return null
    }
    return null
  }
}
