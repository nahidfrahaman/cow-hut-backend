import { Model, ObjectId } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'barishal'
    | 'Rajshahi'
    | 'Khulna'
    | 'Sylhet'
    | 'Rangpur'
    | 'Mymenshing';
  breed: string;
  weight: string;
  category: 'Dairy' | 'Beef' | 'DualPurpose';
  label: 'forSale' | 'soldOut';
  seller: ObjectId | IUser;
};

export type CowModel = Model<ICow>;

export type ICowFilters = {
  searchTerm?: string;
  minPrice?: string | undefined | null;
  maxPrice?: string | undefined | null;
  location?: string;
  category?: string;
};
