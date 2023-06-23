import { GenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorRespone = {
  statusCode: number;
  message: string;
  errorMessage: GenericErrorMessage[];
};
