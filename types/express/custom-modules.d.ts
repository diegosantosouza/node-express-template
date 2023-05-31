declare module Express {
  export interface AuthenticatedUser {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
    firstName: string
    lastName: string
    birthDate?: Date
    email: string
    password: string
    roles: Roles[]
    gender?: Gender
  }

  enum Roles {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }

  enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others',
  }

  interface Request {
    user?: AuthenticatedUser
  }
}
