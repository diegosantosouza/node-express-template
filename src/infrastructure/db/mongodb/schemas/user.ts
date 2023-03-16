/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { IModel } from './../contracts/model-paginate'
import { Gender, Roles, UserModel } from "@/domain/models/user"
import { Model, model, Schema, Document } from "mongoose"
import * as paginate from 'mongoose-paginate-v2'

export interface UserDoc extends Document<UserModel> { }

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: Date,
    roles: [{
      type: String,
      default: Roles.USER,
      enum: Object.values(Roles),
    }],
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true, sparse: true }
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: Object.values(Gender),
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.index({ email: 1 }, { unique: true, sparse: true })
userSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
})
userSchema.plugin(paginate)

export const UserSchema = model<UserDoc>(
  'User',
  userSchema,
) as IModel<UserDoc>
