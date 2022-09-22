const express = require("express");
const controller = require("../controllers/OrderItemController");

const router = express.Router();

router.get('/:idOrder/items/create', controller.getStore);
router.post('/:idOrder/items/create', controller.store);

module.exports = router;