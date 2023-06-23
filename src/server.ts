import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

const port = config.port || 3000;

process.on('uncaughtException', error => {
  console.log('uncaught expection is detected', error);
  process.exit(1);
});
let server: Server;

async function dataBaseMonstar() {
  try {
    await mongoose
      .connect(config.database_Url as string)
      .then(() => console.log('🔗🩹 Database is connected 🦴🦴'));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', error => {
  console.log('unhandle rejection detected we are closing server');
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

dataBaseMonstar();
