import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_Url: process.env.URL,
  bcrypt_solt_roud: process.env.DEFAULT_SOLT_ROUND,

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expired: process.env.JWT_EXPIRED_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED_IN,
  },
};
