import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.info('Database connected!');
  })
  .catch(() => {
    console.error('Database connection failed!');
  });
