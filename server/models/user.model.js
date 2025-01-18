import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  prevOrder: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],
  image: {
    type: String,
  },
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation"
  }]
});

const User = mongoose.model("User", userSchema);

export default User;
