import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Email is already registered || Need to login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic:
        "https://res.cloudinary.com/drn8ou2tw/image/upload/v1738353466/Hungry%20Chef/dummy-profile.jpg",
      ...(role && { role }),
    });

    await newUser.save();

    return res.status(200).json({
      message: "User  registered successfully",
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
      profilePic: user.profilePic,
      address: user.address
    };

    console.log("Login Data");
    console.log(user);

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const cookieOptions = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        message: "User Logged In successful",
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
          address: user.address
        },
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
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found || Need to register first",
      });
    }

    return res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    console.log("Error in getting user by id: ", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    // Find user first
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (address) user.address = address;
    if (req.file) user.profilePic = req.file.path;

    // Save the updated user
    await user.save();

    // Generate new token with updated user details
    const payload = {
      user: user._id,
      name: user.name,
      role: user.role,
      profilePic: user.profilePic,
      address: user.address
    };

    const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const cookieOptions = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", newToken, cookieOptions) // Update cookie
      .json({
        message: "Profile updated successfully.",
        token: newToken, // Send new token
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
          address: user.address
        },
      });
  } catch (error) {
    console.log('Error in updating profile:', error);
    return res.status(500).json({
      message: "Error in updating the profile",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};






const authController = {
  register,
  login,
  getUserById,
  updateProfile,
};

export default authController;
