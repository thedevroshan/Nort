import express from "express";

// Middlewares
import {isInPage} from "../middlewares/isinpage.middleware";
import {isLoggedIn} from "../middlewares/isloggedin.middleware";

// Controllers
import {
    AddElement,
    UpdateTextBasedElement,
    UpdateListBasedElement,
    UpdateURLBasedElement,
    UpdateMediaBasedElement,
    TextBasedTurnInto,
    ListBasedTurnInto,
} from "../controllers/element.controller"

const router:express.Router = express.Router();


router.post("/", isLoggedIn, isInPage, AddElement); // Query -> ?pageId=<pageId>&elementType=<elementType>

// Updations Routes
router.put("/update/text-based",isLoggedIn, isInPage, UpdateTextBasedElement); // Query -> ?pageId=<pageId>
router.put("/update/media-based",isLoggedIn, isInPage, UpdateMediaBasedElement); // Query -> ?pageId=<pageId>
router.put("/update/url-based",isLoggedIn, isInPage, UpdateURLBasedElement); // Query -> ?pageId=<pageId>
router.put("/update/list-based",isLoggedIn, isInPage, UpdateListBasedElement); // Query -> ?pageId=<pageId>

// Turn Into Routes
router.put("/turn-into/text-based",isLoggedIn, isInPage, TextBasedTurnInto); // Query -> ?pageId=<pageId>&turnInto=<type>
router.put("/turn-into/list-based",isLoggedIn, isInPage, ListBasedTurnInto); // Query -> ?pageId=<pageId>&turnInto=<type>

export default router;