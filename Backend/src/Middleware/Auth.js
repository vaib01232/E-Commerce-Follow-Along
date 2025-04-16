const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../Config/.env" });

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // 🔥 Extract token after "Bearer "

    const decoded = jwt.verify(token, process.env.secretkey);
    req.user = decoded.email; // Set decoded email to req.user

    next();
  } catch (err) {
    console.error("❌ Error in auth middleware:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
