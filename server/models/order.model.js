import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },  
  totalPrice: {
    type: Number,
  },
  deliveryAddress: {
    type: String,
    required: true
  },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
