const jwt = require("jsonwebtoken");
const User = require("./userModel");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    try {
      const decoded = jwt.verify(bearerToken, JWT_SECRET);

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(403).json({ message: "Forbidden: No token provided" });
  }
}

module.exports = verifyToken;
