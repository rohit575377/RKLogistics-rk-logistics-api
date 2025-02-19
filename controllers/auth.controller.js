import Joi from "joi";
import User from "../models/user.model.js";
import { comparePassword, generateToken, hashPassword } from "../services/auth.service.js";

export const register = async (req, res) => { 
  try {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email",
      }),
      password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 6 characters long",
      }),
      role: Joi.string().valid("shipper", "carrier", "driver").required().messages({
        "any.required": "Role is required",
        "any.only": "Role must be either 'shipper', 'carrier', or 'driver'",
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    const { name, email, password, role } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const hashedPassword = hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(user._id);
    res.status(201).json({ success: true, data: { token } });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.user
  });
}