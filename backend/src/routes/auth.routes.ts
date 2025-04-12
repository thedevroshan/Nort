// Dependencies
import express from "express";

// Controllers
import {
    Register,
    EmailVerification,
    Login,
    Logout
} from "../controllers/auth.controller"

// Utils
import {
    ValidateEmail,
    ValidatePassword,
    ValidateUsername
} from "../utils/FieldsValidator";

const router:express.Router = express.Router();

router.post("/register",ValidateEmail,ValidateUsername,ValidatePassword, Register)
router.get("/email-verification/:token", EmailVerification)
router.get("/login", Login)
router.get("/logout", Logout)

export default router;