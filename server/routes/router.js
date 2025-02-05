import express from 'express';
import authController from '../controllers/auth.controller.js';
import menuController from '../controllers/menu.controller.js';
import orderController from '../controllers/order.controller.js';
import reservationController from '../controllers/reservation.controller.js';
import upload from '../middlewares/multer.middleware.js';
import categoryController from '../controllers/category.controller.js';
const router = express.Router();

// User Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/getUser/:id", authController.getUserById);
router.patch("/auth/updateProfile/:id", upload.single("profilePic"), authController.updateProfile);

// Menu Routes
router.post("/menu/addItem", menuController.addMenuItem);
router.get("/menu/getAllItems", menuController.getAllItems);
router.get("/menu/getItemById", menuController.getItemById);
router.patch("/menu/updateItem", menuController.updateItem);
router.delete("/menu/deleteOne", menuController.deleteItem);
router.get("/menu/getMenuFromCategory/:id", menuController.getItemsByCategory);

// Order Routes
router.post("/order/createOrder", orderController.createOrder);
router.get("/order/getOrderById/:id", orderController.getOrderById)
router.get("/order/getOrderByUser", orderController.getOrderByUser)


// Reservation Routes
router.post("/reservation/makeReservation", reservationController.makeReservation);
router.get("/reservation/getReservationById/:id", reservationController.getReservationById);
router.get("/reservation/getReservationForUser", reservationController.getReservationForUser);
router.patch("/reservation/updateReservation", reservationController.updateReservation);

// Category Routes
router.get("/categories/getAll", categoryController.getCategories)

export default router;