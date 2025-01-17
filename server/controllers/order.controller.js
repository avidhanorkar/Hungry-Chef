import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Menu from "../models/menu.model.js";

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

    user.prevOrder.push(order._id);
    await user.save();

    return res.status(200).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.log("Error in creating the order: ", error);
    return res
      .status(500)
      .json({ message: "Error in creating the order", error: error.message });
  }
};





const orderController = {
    createOrder,

}

export default orderController;