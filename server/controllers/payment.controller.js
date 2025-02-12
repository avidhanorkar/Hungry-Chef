import razorpay from "razorpay";
import crypto, { sign } from "crypto";

const razorpayInstance = new razorpay({
  key_id: process.env.RZRPY_API_KEY,
  key_secret: process.env.RZRPY_API_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise || 1 INR = 100 paise
      currency: "INR",
      receipt: `order_receipt${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error in creating the order: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RZRPY_API_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature === signature) {
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error in verifying the payment: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const paymentController = {
    createOrder,
    verifyPayment,
}

export default paymentController;