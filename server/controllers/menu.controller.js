import Menu from "../models/menu.model.js";
import Category from "../models/category.model.js";

// Add Menu Item with Category
const addMenuItem = async (req, res) => {
  try {
    const { name, desc, price, category } = req.body;

    // Check if menu item already exists
    const dishItem = await Menu.findOne({ menuItem: name });
    if (dishItem) {
      return res.status(400).json({
        message: "Dish already exists",
      });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    // Create new menu item
    const newItem = new Menu({
      menuItem: name,
      desc: desc,
      price: price,
      category: category,  // Store category reference
    });
    await newItem.save();

    return res.status(200).json({
      message: "Dish added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Error in adding Item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get All Menu Items (With Category Details)
const getAllItems = async (req, res) => {
  try {
    const items = await Menu.find().populate("category", "name image");

    if (!items.length) {
      return res.status(404).json({
        message: "No items found",
      });
    }

    return res.status(200).json({
      message: "Items retrieved successfully",
      items: items,
    });
  } catch (error) {
    console.error("Error in getting Items:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Item By ID (With Category Details)
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Menu.findById(id).populate("category", "name image");

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
    console.error("Error in getting Item by Id:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Menu Item (Including Category)
const updateItem = async (req, res) => {
  try {
    const { id, name, desc, price, category } = req.body;

    const item = await Menu.findById(id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    // Check if category exists (if updating category)
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          message: "Invalid category ID",
        });
      }
      item.category = category;
    }

    // Update fields
    item.menuItem = name || item.menuItem;
    item.desc = desc || item.desc;
    item.price = price || item.price;

    await item.save();

    return res.status(200).json({
      message: "Item updated successfully",
      item: item,
    });
  } catch (error) {
    console.error("Error in updating Item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Menu Item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Menu.findById(id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting Item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Menu Items by Category
const getItemsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const items = await Menu.find({ category: id }).populate("category", "name image");

    return res.status(200).json({
      message: "Items retrieved successfully",
      items: items,
    });
  } catch (error) {
    console.error("Error in getting Items by Category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const menuController = {
  addMenuItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
};

export default menuController;
