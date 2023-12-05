import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));


import MongoStore from "connect-mongo";
import { connectionString } from './daos/mongoseDb/connection.Mongose.js';

export const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: connectionString,
      ttl: 120,
      crypto: {
        secret: '1234'
      }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 120000,
    },
  };