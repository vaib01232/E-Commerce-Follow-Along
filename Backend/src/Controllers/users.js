const { Router } = require("express");
const userModel = require("../Model/userModel");
const { upload, productupload, resizeProductImages } = require("../../multer");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userrouter = Router();
const AsyncError = require('../Middleware/catchAsyncError');
const auth = require("../Middleware/auth");
require('dotenv').config({ path: './src/config/.env' });

const secret = process.env.secretkey;
const path = require('path');

if (!secret) {
  console.warn("⚠️ Warning: JWT secret key is not defined in environment variables.");
}

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};

const isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return file && allowedTypes.includes(file.mimetype);
};

userrouter.post("/create-user", upload.single('file'), async (req, res) => {
  try {
    console.log("➡️ /auth/create-user route hit");
    const { name, email, password } = req.body;
    const file = req.file;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", file);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol." });
    }

    if (file && !isValidImage(file)) {
      return res.status(400).json({ message: "Invalid file type. Only JPEG and PNG are allowed." });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hash,
      avatar: file ? {
        public_id: `local-${Date.now()}`,
        url: `/uploads/${file.filename}`
      } : undefined,
    });

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.secretkey);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.get("/profile", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || null
      },
      addresses: user.addresses || []
    });
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.post("/add-address", async (req, res) => {
  try {
    const {
      email,
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType
    } = req.body;

    if (!email || !country || !city || !address1 || !zipCode || !addressType) {
      return res.status(400).json({ message: "Missing required address fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = {
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ message: "Address added successfully", addresses: user.addresses });
  } catch (error) {
    console.error("❌ Error in /user/add-address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.get('/addresses', async (req, res) => {
  const { email } = req.query;  // Expecting the email in query params

  if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
  }

  try {
      const user = await userModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // If addresses exist, send them; otherwise, send an empty array
      res.status(200).json({ addresses: user.addresses });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error, unable to fetch addresses.' });
  }
});

module.exports = userrouter;
