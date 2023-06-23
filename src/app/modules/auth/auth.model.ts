import { Schema, model } from 'mongoose';
import { AuthModel, IAuthUser } from './auth.interface';

const AuthSchema = new Schema<IAuthUser, AuthModel>(
  {
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AuthUser = model<IAuthUser & Document, AuthModel>(
  'AuthUser',
  AuthSchema
);
