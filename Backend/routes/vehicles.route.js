import { Router } from "express";
import {
  registerVehicle,
  deleteVehicle,
  fetchVehicles,
  fetchVehicleById,
  searchVehicles,
  recommendSimilarVehicles,
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
router.route("/search").get(searchVehicles);
router.route("/similar/:id").get(recommendSimilarVehicles);
router.route("/fetchvehicle").get(fetchVehicles);
router.route("/fetchvehicle/:id").get(fetchVehicleById);
export default router;
