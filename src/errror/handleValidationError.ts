import mongoose from 'mongoose';
import { IGenericErrorRespone } from '../interface/common';
import { GenericErrorMessage } from '../interface/error';
const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorRespone => {
  const error: GenericErrorMessage[] = Object.values(err.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessage: error,
  };
};

export default handleValidationError;
