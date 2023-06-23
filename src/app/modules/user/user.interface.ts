import { Model, ObjectId } from 'mongoose';

export type IUser = {
  id?: ObjectId;
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password?: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  budget?: number;
  address?: string;
  role?: string;
};
