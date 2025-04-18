import {Router} from "express";

// Controllers
import {
    CreatePage,
    ChangeTitle,
    ChangeDescription,
    MakeTemplate,
    JoinPage,
} from "../controllers/page.controller"

// Middlewares
import {isLoggedIn} from "../middlewares/isloggedin.middleware";
import {isOwner} from "../middlewares/isowner.middleware";

const router:Router = Router();

router.post("/",isLoggedIn, CreatePage); // Query -> ?title=<title>
router.put("/change-title", isLoggedIn, ChangeTitle) // Query -> ?pageId=<Id>&title=<title>
router.put("/change-description", isLoggedIn, ChangeDescription) // Query -> ?pageId=<Id>&description=<description>
router.put("/make-template", isLoggedIn,isOwner, MakeTemplate) // Query -> ?pageId=<Id>
router.put("/join", isLoggedIn, JoinPage) // Query -> ?pageId=<Id>


export default router;