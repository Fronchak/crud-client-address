import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import clientRouter from './src/routes/clientRoutes.js';
import './src/database/index.js';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.use('/clients', clientRouter);
  }
}

export default new App().app;

