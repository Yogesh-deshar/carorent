import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    if (Password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await User.create({
      username,
      PhoneNumber,
      Email: Email.toLowerCase(),
      Password: hashedPassword,
      DrivingLicenseNumber,
      Address,
    });

    const { Password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find().select("-Password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ Email: Email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const { Password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-Password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      PhoneNumber,
      Email,
      DrivingLicenseNumber,
      Address,
      Password,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = {};

    if (username !== undefined) updates.username = username;
    if (PhoneNumber !== undefined) updates.PhoneNumber = PhoneNumber;
    if (DrivingLicenseNumber !== undefined) {
      updates.DrivingLicenseNumber = DrivingLicenseNumber;
    }
    if (Address !== undefined) updates.Address = Address;

    if (Email !== undefined) {
      const normalizedEmail = Email.toLowerCase();
      if (normalizedEmail !== user.Email.toLowerCase()) {
        const existingUser = await User.findOne({ Email: normalizedEmail });
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
      updates.Email = normalizedEmail;
    }

    if (Password) {
      if (Password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      updates.Password = await bcrypt.hash(Password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-Password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerUser,
  deleteUser,
  fetchUsers,
  loginUser,
  fetchUserById,
  updateUser,
};
