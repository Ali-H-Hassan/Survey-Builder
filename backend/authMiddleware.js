const jwt = require("jsonwebtoken");
const User = require("./userModel");

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = {
      userId: user._id,
      isAdmin: user.isAdmin,
    };

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = verifyToken;
