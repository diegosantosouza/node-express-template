export type UserModel = {
  id: string
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  password: string
  roles: Roles[]
  gender?: Gender
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}
