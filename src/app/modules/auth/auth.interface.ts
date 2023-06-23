import { Document, Model, ObjectId } from 'mongoose';

export type IAuthUser = {
  password?: string;
  role: 'seller' | 'buyer';
  id: ObjectId;
};

export type AuthModel = Model<IAuthUser & Document>;
