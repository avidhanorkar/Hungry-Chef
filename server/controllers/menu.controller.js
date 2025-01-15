import Menu from "../models/menu.model.js";

const addMenuItem = async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    const dishItem = await Menu.findOne({ name: name });

    if (dishItem) {
      return res.status(400).json({
        message: "Dish already exists",
      });
    }

    const newItem = new Menu({
      menuItem: name,
      desc: desc,
      price: price,
    });
    await newItem.save();

    return res.status(200).json({
      message: "Dish added successfully",
      item: newItem,
    });
  } catch (error) {
    console.log("Error in adding Item: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Menu.find();

    if (!items) {
      return res.status(400).json({
        message: "No items found",
      });
    }

    return res.status(200).json({
      message: "Items found",
      items: items,
    });
  } catch (error) {
    console.log("Error in getting Items: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.body;

    const item = await Menu.findById(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    return res.status(200).json({
      message: "Item found",
      item: item,
    });
  } catch (error) {
    console.log("Error in getting Item by Id: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, name, desc, price } = req.body;

    const item = await Menu.findById(id);

    item.menuItem = name || item.menuItem;
    item.desc = desc || item.desc;
    item.price = price || item.price;

    await item.save();

    return res.status(200).json({
      message: "Item updated",
      item: item,
    });
  } catch (error) {
    console.log("Error in updating Item: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;

    const item = await Menu.findById(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      message: "Item deleted",
      item: item,
    });
  } catch (error) {
    console.log("Error in deleting Item: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// More Controllers To create
//  1. Get Menu items according to the category

const menuController = {
  addMenuItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};

export default menuController;
