import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespone } from '../interface/common';
import { GenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError): IGenericErrorRespone => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleZodError;
