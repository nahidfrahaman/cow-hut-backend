import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

import ApiError from '../../errror/apiError';
import { JwtHelpers } from '../../helper/jwtHelper';

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // access token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          'you are not authorized user'
        );
      }
      //verify token
      const verifiedUser: JwtPayload | string = JwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      req.user = verifiedUser;
      if (
        requiredRole.length &&
        typeof verifiedUser !== 'string' &&
        !requiredRole.includes(verifiedUser?.role)
      ) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
