import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  Status: {
    enum: ["Pending", "Success", "Failed"],
    defualt: "Pending",
  }
}, {
    timestamps: true,
});

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;