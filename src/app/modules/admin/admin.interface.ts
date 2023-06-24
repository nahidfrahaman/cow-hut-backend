import { Model } from 'mongoose';

export type IAdmin = {
  phoneNumber: string;
  role: 'admin';
  password: string;
  needPasswordChange: boolean;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  address: string;
};

export type IAdminresponse = {
  phoneNumber: string;
  password: string;
  role: string;
  needPasswordChange: string;
};

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<IAdminresponse>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, IAdminMethods>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  address?: string;
  phoneNumber?: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean | undefined | string;
};

export type IRfreshResponse = {
  accessToken: string | undefined;
};
