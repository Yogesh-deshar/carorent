import { Router } from "express";
import {
  registerUser,
  deleteUser,
  fetchUsers,
  loginUser,
  fetchUserById,
  updateUser,
} from "../controller/user.controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/fetchuser").get(fetchUsers);
router.route("/fetchuser/:id").get(fetchUserById);
router.route("/update/:id").put(updateUser);
export default router;
