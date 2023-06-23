/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errror/apiError';
import handleCastError from '../../errror/handleCastError';
import handleValidationError from '../../errror/handleValidationError';
import handleZodError from '../../errror/handleZodError';
import { GenericErrorMessage } from '../../interface/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log('global error handler theke ----~~~~~~', error)
    : console.log(' global error handler theke ----~~~~~~', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessage: GenericErrorMessage[] = [];

  if (error.name == 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage);
  } else if (error.name === 'CastError') {
    console.log('lalalala');
    const simplifiedError = handleCastError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message);
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof Error) {
    message = 'something went wrong from instance';
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
