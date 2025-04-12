import express, {Router} from 'express'

// Middlewares
import {isLoggedIn} from "../middlewares/isloggedin.middleware";

// Controllers
import {
    GetUserInfo,
    ChangeName,
    ChangeUsername,
    ChangeEmailRequest,
    ChangeEmail,
    ChangePassword
} from "../controllers/user.controller";

// Utils
import {ValidateEmail, ValidatePassword} from "../utils/FieldsValidator";


const router:Router = express.Router()

router.get("/", isLoggedIn, GetUserInfo)
router.put("/change-name", isLoggedIn, ChangeName)
router.put("/change-username", isLoggedIn, ChangeUsername)
router.put("/change-email-request", isLoggedIn, ChangeEmailRequest)
router.put("/change-email", isLoggedIn,ValidateEmail, ChangeEmail)
router.put("/change-password", isLoggedIn,ValidatePassword,ChangePassword)

export default router