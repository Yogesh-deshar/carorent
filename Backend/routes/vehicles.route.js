import { Router } from "express";
import {
  registerVehicle,
  deleteVehicle,
  fetchVehicles,
  upload,
} from "../controller/vehicles.controller.js";

const router = Router();

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  next();
};

router
  .route("/register")
  .post(upload.single("image"), handleMulterError, registerVehicle);
router.route("/delete/:id").delete(deleteVehicle);
router.route("/fetchvehicle").get(fetchVehicles);
export default router;
