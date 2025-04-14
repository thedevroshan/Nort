import {Router} from "express";

// Controllers
import {
    CreatePage,
    ChangeTitle,
    ChangeDescription,
    MakeTemplate,
    JoinPage
} from "../controllers/page.controller"

// Middlewares
import {isLoggedIn} from "../middlewares/isloggedin.middleware";

const router:Router = Router();

router.post("/",isLoggedIn, CreatePage);
router.put("/change-title", isLoggedIn, ChangeTitle) // Query -> ?pageId=<Id>&title=<title>
router.put("/change-description", isLoggedIn, ChangeDescription) // Query -> ?pageId=<Id>&description=<description>
router.put("/make-template", isLoggedIn, MakeTemplate) // Query -> ?pageId=<Id>
router.put("/join", isLoggedIn, JoinPage) // Query -> ?pageId=<Id>


export default router;