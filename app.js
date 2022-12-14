const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const {globalMiddleware, clientFormMiddleware} = require('./src/middlewares/middleware');
const clientRouter = require('./src/routes/clientRoutes');
const homeRouter = require('./src/routes/homeRoutes');
const addressRouter = require('./src/routes/addressRoutes');
const categotyRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/ProductRoutes');
const orderRoutes = require('./src/routes/OrderRoutes');
const orderItemRoutes = require('./src/routes/orderItemRoutes');
require ('./src/database/index');

dotenv.config();

class App {
  constructor() {
    console.log(__dirname)
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
    this.errors();
  }

  config() {
    this.app.set('views', path.resolve(__dirname, 'src', 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve(__dirname, 'src', 'public')));
  }

  middlewares() {
    this.app.use(globalMiddleware);
    this.app.use('/clients', clientFormMiddleware);
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/clients', clientRouter);
    this.app.use('/address', addressRouter);
    this.app.use('/categories', categotyRoutes);
    this.app.use('/products', productRoutes);
    this.app.use('/orders', orderItemRoutes);
    this.app.use('/orders', orderRoutes);
  }

  errors() {
    this.app.use(function(err, req, res, next) {
      if (res.locals.err) return next(res.locals.err);
      next(createError(404));
    });

    this.app.use(function(err, req, res, next) {
      res.render('error', {
        error: err
      });
    });
  }
}

module.exports = new App().app;

