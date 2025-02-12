import express from 'express';
import authController from '../controllers/auth.controller.js';
import menuController from '../controllers/menu.controller.js';
import orderController from '../controllers/order.controller.js';
import reservationController from '../controllers/reservation.controller.js';
import upload from '../middlewares/multer.middleware.js';
import categoryController from '../controllers/category.controller.js';
import cartController from '../controllers/cart.controller.js';
import paymentController from '../controllers/payment.controller.js';

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

// Cart Routers
router.post("/cart/addToCart/:id", cartController.addToCart);
router.get("/cart/getCart/:userId", cartController.getCart);
router.delete("/cart/removeItem/:id", cartController.removeItemFromCart);


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
router.get("/categories/getAll", categoryController.getCategories);

// Payment Routes
router.post("/payment/createOrder", paymentController.createOrder);
router.post("/payment/verifyPayment", paymentController.verifyPayment);

export default router;