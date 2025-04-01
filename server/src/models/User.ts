import { Schema, model } from 'mongoose'
import { BaseDocument } from './BaseDocument'
import bcrypt from 'bcryptjs'

export interface IUser extends BaseDocument {
  username: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

// adds runtime behavior
UserSchema.virtual('id').get(function () {
  return this._id.toString()
})

// Required to include virtuals in queries
UserSchema.set('toJSON', { virtuals: true })
UserSchema.set('toObject', { virtuals: true })

export const User = model<IUser>('User', UserSchema)
