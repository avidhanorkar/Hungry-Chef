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
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/drn8ou2tw/image/upload/v1738353466/Hungry%20Chef/dummy-profile.jpg"
  },
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation"
  }]
});

const User = mongoose.model("User", userSchema);

export default User;
