import express from 'express';
import authController from '../controllers/auth.controller.js';
import menuController from '../controllers/menu.controller.js';
import orderController from '../controllers/order.controller.js';
const router = express.Router();

// User Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/getUser", authController.getUserById);

// Menu Routes
router.post("/menu/addItem", menuController.addMenuItem);
router.get("/menu/getAllItems", menuController.getAllItems);
router.get("/menu/getItemById", menuController.getItemById);
router.patch("/menu/updateItem", menuController.updateItem);
router.delete("/menu/deleteOne", menuController.deleteItem);

// Order Routes
router.post("/order/createOrder", orderController.createOrder);

export default router;