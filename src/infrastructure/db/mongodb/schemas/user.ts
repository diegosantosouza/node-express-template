/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Gender, Roles, UserModel } from "@/domain/models/user"
import { Model, model, Schema, Document } from "mongoose"

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

export const UserSchema: Model<UserDoc> = model<UserDoc>(
  'User',
  userSchema,
)
