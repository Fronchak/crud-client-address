import express from 'express';
import controller from '../controllers/ClientController.js';

const Router = express.Router;

const router = new Router();
router.get('/', controller.index);
router.get('/create', controller.getStore);
router.post('/create', controller.store);
router.get('/update/:id', controller.getUpdate);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.getDelete);
router.post('/delete/:id', controller.delete);
router.get('/:id', controller.show);

export default router;