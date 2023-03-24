import { UserModel } from '@/domain/models/user';
import { CreateUserRepository, IndexUserRepository, RemoveUserRepository, ShowUserRepository, UpdateUserRepository } from "@/data/protocols/db/user"
import MongoHelper from "../mongo-helper"
import { UserDoc, UserSchema } from "../schemas/user"
import { LoadAccountByEmailRepository } from '@/data/protocols/db/user/load-account-by-email-repository';

export class UserRepository implements CreateUserRepository,
  RemoveUserRepository,
  UpdateUserRepository,
  ShowUserRepository,
  IndexUserRepository,
  LoadAccountByEmailRepository {
  async create(data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const newUser = await UserSchema.create(data)
    return newUser.toObject()
  }

  async delete(id: RemoveUserRepository.Params): Promise<RemoveUserRepository.Result> {
    await UserSchema.findByIdAndDelete(id)
    return true
  }

  async show(id: ShowUserRepository.Params): Promise<ShowUserRepository.Result> {
    const user = await UserSchema.findById(id).select('-password')
    return user ? user.toObject() : null
  }

  async update({ id, data }: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    const user = await UserSchema.findByIdAndUpdate(id, data, { new: true }).select('-password')
    return user ? user.toObject() : null
  }

  async index(params: IndexUserRepository.Params = {}): Promise<IndexUserRepository.Result> {
    const select = { select: '-password' }
    const users = await MongoHelper.paginate<UserDoc, UserModel>(params.where, UserSchema, { ...params, ...select })
    return users
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    const user = await UserSchema.findOne({ email })
    return user ? user.toObject() : null
  }

}
