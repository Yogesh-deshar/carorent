import User from "../model/user.model.js";

const registerUser = async (req, res) => {
  try {
    const {
      username,
      PhoneNumber,
      Email,
      Password,
      DrivingLicenseNumber,
      Address,
    } = req.body;
    if (
      !username ||
      !PhoneNumber ||
      !Email ||
      !Password ||
      !DrivingLicenseNumber ||
      !Address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ Email: Email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      username,
      PhoneNumber,
      Email: Email.toLowerCase(),
      Password,
      DrivingLicenseNumber,
      Address,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;
