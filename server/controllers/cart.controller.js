import Menu from "../models/menu.model.js";
import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, menuItems: [], totalPrice: 0 });
    }

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu Not Found || Invalid Menu ID",
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.menuItems.find(
      (item) => item.menu.toString() === id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.menuItems.push({ menu: id, quantity });
    }

    cart.totalPrice += menu.price * quantity;
    await cart.save();

    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "menuItems.menu", 
      model: "Menu",
      select: "menuItem desc price image", // Fields to include in the populated data (you can adjust this)
    });

    if (!cart) {
      return res.status(404).json({
        message: "The cart is empty",
      });
    }

    return res.status(200).json({
      message: "Cart Retrieved Successfully",
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const menu = await menu.findById(id);
    const cart = await cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is Empty || Need to Order",
      });
    }

    cart.menutItems = cart.menuItems.filter(
      (item) => item.menu.toString() !== id
    );
    cart.totalPrice -= menu.price * menuItems.quantity;
    await cart.save();
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const cartController = {
  removeItemFromCart,
  getCart,
  addToCart,
};

export default cartController;
