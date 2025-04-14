import express from 'express'

// Middleware
import {isLoggedIn} from "../middlewares/isloggedin.middleware";

// Controller
import {
    GetRoles,
    CreateRole,
    AssignRole,
    UnassignRole,
    EditRole,
    DeleteRole
} from "../controllers/role.controller"


const router:express.Router = express.Router()

router.get('/', isLoggedIn, GetRoles) // Query -> ?pageId=<Id>
router.post('/', isLoggedIn, CreateRole) // Query -> ?pageId=<Id>&roleName=<role name>&color=<hex>
router.put('/assign-role', isLoggedIn, AssignRole) // Query -> ?roleId=<Id>&member=<memberId>
router.put('/unassign-role', isLoggedIn, UnassignRole) // Query -> ?roleId=<Id>&member=<memberId>
router.put('/edit-role', isLoggedIn, EditRole) // Query -> ?roleId=<Id>&roleName=<name>&color=<hexCode>
router.delete('/', isLoggedIn, DeleteRole) // Query -> ?roleId=<Id>

export default router;
