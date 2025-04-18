import express from "express";

import {VerifyJWT} from "../utils/JWT";

// Models
import {Page} from "../models/page.model";


export const isOwner = async (req: express.Request, res: express.Response, next:express.NextFunction):Promise<void>=>{
    try{
        const page = await Page.findById(req.query?.pageId);
        if(!page){
            res.status(404).json({ok: false, msg: "Not Found"});
            return;
        }

        if(page.owner !== req.user?.id){
            res.status(401).json({ok: false, msg: "You don't have permission to make this page a template."});
            return;
        }

        next()
    }
    catch (error){
        if(process.env.NODE_ENV === 'development'){
            console.log(error)
            return;
        }
        console.log('Something went wrong in isOwner middleware.');
    }
}