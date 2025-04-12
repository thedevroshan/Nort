import express from "express";

import {VerifyJWT} from "../utils/JWT";

// Models
import {User, IUser} from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const isLoggedIn = async (req: express.Request, res: express.Response, next:express.NextFunction):Promise<void>=>{
    try{
        const {token} = req.cookies
        if(!token){
            res.status(404).json({ok: false, msg:"No token provided"});
            return;
        }

        const decryptedToken = VerifyJWT(token);
        if(decryptedToken == null){
            res.status(401).json({ok: false, msg:"Authentication failed"});
            return;
        }

        const user = await User.findById(decryptedToken?.userId).select("-password");
        if(!user){
            res.status(404).json({ok: false, msg:"User not found"});
            return;
        }

        req.user = user
        next()
    }
    catch (error){
        if(process.env.NODE_ENV === 'development'){
            console.log(error)
            return;
        }
        console.log('Something went wrong in isLoggedIn middleware.');
    }
}