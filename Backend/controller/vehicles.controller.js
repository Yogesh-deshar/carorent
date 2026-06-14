import multer from "multer";
import path from "path";
import fs from "fs";
import Vehicle from "../model/vehicles.model.js";

// Ensure uploads directory exists
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// store uploads on disk and keep only the path in DB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

const registerVehicle = async (req, res) => {
  try {
    const {
      VehiclesName,
      VehiclesModel,
      VehiclesYear,
      VehiclesType,
      VehiclesWheel,
      VehiclesEngine,
      VehiclesAcceleration,
      VehiclesTopspeed,
      VehiclesSeat,
      VehiclesColor,
      VehiclesPrice,
      VehiclesDetails,
    } = req.body;
    // multer places the uploaded file in `req.file`
    const file = req.file;
    if (
      !VehiclesName ||
      !VehiclesModel ||
      !VehiclesYear ||
      !VehiclesType ||
      !VehiclesWheel ||
      !VehiclesEngine ||
      !VehiclesAcceleration ||
      !VehiclesTopspeed ||
      !VehiclesSeat ||
      !VehiclesColor ||
      !VehiclesPrice ||
      !VehiclesDetails ||
      !file
    ) {
      return res
        .status(400)
        .json({ message: "All fields and an image file are required" });
    }

    const existingVehicle = await Vehicle.findOne({ VehiclesName });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

    const storedPath = `/uploads/${file.filename}`;

    const newVehicle = await Vehicle.create({
      Path: storedPath,
      ImageName: file.filename,
      VehiclesName,
      VehiclesModel,
      VehiclesYear,
      VehiclesCategory,
      VehiclesType,
      VehiclesWheel,
      VehiclesEngine,
      VehiclesAcceleration,
      VehiclesTopspeed,
      VehiclesSeat,
      VehiclesColor,
      VehiclesPrice,
      VehiclesDetails,
    });

    res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerVehicle,
  deleteVehicle,
  fetchVehicles,
  fetchVehicleById,
  upload,
};
