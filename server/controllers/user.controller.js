import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { inngest } from "../inngest/client.js";

//@route  POST /api/users/signup
//@desc   Register a new user
//@access Public
export const signup = async (req, res) => {
  try {
    const { email, password, skills = [] } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, skills });

    //Fire Inngest Event
    await inngest.send({
      name: "user/signup",
      data: {
        email: user.email,
      },
    });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

//@route  POST /api/users/login
//@desc   Login a user
//@access Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

//@route  POST /api/users/logout
//@desc   Logout a user
//@access Private
export const logout = async (req, res) => {
  try {
    const token = req.header.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

//@route  PUT /api/users/update
//@desc   Update user role and skills
//@access Private (Admin only)
export const updateUser = async (req, res) => {
  const { skills, role, email } = req.body;
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    User.updateOne(
      { email },
      {
        $set: {
          skills: skills && skills.length ? skills : user.skills,
          role: role || user.role
        }
      }
    )

    if (response.modifiedCount === 1) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No changes made to the user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User update failed",
      error: error.message,
    });
  }
};

//@route  GET /api/users
//@desc   Get all users
//@access Private (Admin only)
export const getUsers = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    //remove password and __v fields
    const users = await User.find().select("-password -__v");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
}
