import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    menuItems: [
        {
            menu: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;