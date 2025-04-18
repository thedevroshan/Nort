import express from "express";

// Middlewares
import {isInPage} from "../middlewares/isinpage.middleware";
import {isLoggedIn} from "../middlewares/isloggedin.middleware";

// Controllers
import {

} from "../controllers/element.controller"

const router:express.Router = express.Router();



export default router;