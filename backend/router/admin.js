import express from "express";
const router = express.Router();
import { getUser, login,addUser,deleteUser ,getUserDetails,editUser} from "../controller/admin.js";
import { verifyTokenAdmin } from "../middleware/auth.js";

router.post("/login", login);
router.get("/users", verifyTokenAdmin,getUser);
router.post("/users", verifyTokenAdmin,addUser);
router.delete("/users", verifyTokenAdmin,deleteUser);
router.put("/users", verifyTokenAdmin,editUser);
router.get("/userDetails", verifyTokenAdmin,getUserDetails);

export default router;