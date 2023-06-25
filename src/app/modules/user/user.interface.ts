import { Model, ObjectId } from 'mongoose';
import { IAdminresponse } from '../admin/admin.interface';

export type IUser = {
  id?: ObjectId;
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  needPasswordChange: boolean;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<IAdminresponse>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<UserModel>;

// export type UserModel = Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  budget?: number;
  address?: string;
  role?: string;
};
