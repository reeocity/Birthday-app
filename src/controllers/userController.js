const User = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const { fullname, email, dob } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create({ fullname, email, dob });
    res.status(201).json({ message: "User added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
