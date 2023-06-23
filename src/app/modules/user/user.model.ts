import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: false,
    },
    income: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser & Document, UserModel>('User', UserSchema);
