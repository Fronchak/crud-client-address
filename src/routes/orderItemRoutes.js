const express = require("express");
const controller = require("../controllers/OrderItemController");

const router = express.Router();

router.get('/:idOrder/items/create', controller.getStore);
router.post('/:idOrder/items/create', controller.store);
router.get('/:idOrder/products/:idProduct/delete', controller.delete);
router.get('/:idOrder/products/:idProduct/update', controller.getUpdate);
router.post('/:idOrder/products/:idProduct/update', controller.update);
router.get('/:idOrder/items/:idProduct', controller.show);


module.exports = router;