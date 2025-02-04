import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  menuItem: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  image: {
    type: String,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;