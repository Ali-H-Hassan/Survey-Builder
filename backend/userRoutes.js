const express = require("express");
const router = express.Router();
const { signup, login, updateProfile } = require("./userController");
const verifyToken = require("./authMiddleware");
const multer = require("multer");
const path = require("path");
const User = require("./userModel");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/update-profile", verifyToken, updateProfile);
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("profilePic");

router.post("/upload-profile-pic", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file.");
    }

    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      user.profilePicture = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({
        message: "Profile picture uploaded successfully",
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
});

module.exports = router;
