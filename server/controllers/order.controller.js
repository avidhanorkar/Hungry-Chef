import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const createOrder = async (req, res) => {
  try {
    const { userId, menu, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const menuItem = await Menu.findById(menu);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    const totPrice = menuItem.price;

    const order = new Order({
      user: userId,
      menuItem: menu,
      totalPrice: totPrice,
      deliveryAddress: address,
    });
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate("menuItem");

    user.prevOrder.push(order._id);
    await user.save();

    return res.status(200).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.log("Error in creating the order: ", error);
    return res
      .status(500)
      .json({ message: "Error in creating the order", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("menuItem")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      order: order,
    });
  } catch (error) {
    console.log("Error in retreiving the order by id: ", error);
    return res.status(500).json({
      message: "Error in retreiving the order by id",
      error: error.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).populate('prevOrder');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User orders are retrieved successfully",
      orders: user.prevOrder
    })
  } catch (error) {
    console.log("Error in retreiving the order by user: ", error);
    return res.status(500).json({
      message: "Error in retreiving the order by user",
      error: error.message,
    });
  }
};

const orderController = {
  createOrder,
  getOrderById,
  getOrderByUser
};

export default orderController;
