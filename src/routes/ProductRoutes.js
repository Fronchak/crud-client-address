const express = require('express');
const controller = require('../controllers/ProductController');

const router = express.Router();

router.get('/create', controller.getStore);
router.post('/create', controller.store);
router.get('/update/:id', controller.getUpdate);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.getDelete);
router.post('/delete/:id', controller.delete);
router.get('/', controller.index);
router.get('/show/:id', controller.show);

module.exports = router;