import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Email is already registered || Need to login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in register: ", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User not found || Need to Register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      user: user._id,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const cookieOptions = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "User Logged In successful",
      token: token,
    });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "User not found || Need to register first",
            })
        }

        return res.status(200).json({
            message: "User found",
            user: user
        })
    } catch (error) {
        console.log("Error in getting user by id: ", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const authController = {
  register,
  login,
  getUserById
};

export default authController;
