import express from 'express';

// Models
import {Page, IPage} from "../models/page.model";

// Utils
import {INTERNAL_SERVER_ERROR} from "../utils/Errors";

export const CreatePage = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {title} = req.query;

        if(!title || !title.length){
            res.status(400).json({
                ok: false,
                msg: "Missing title"
            })
            return;
        }

        await Page.create({
            title,
            owner: req?.user?._id,
        });

        res.status(201).json({
            ok: true,
            msg: "Successfully created",
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error);
        });
    }
}

export const ChangeTitle = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {pageId, title} = req.query;
        if(!title || !title.length){
            res.status(400).json({
                ok: false,
                msg: "Missing title"
            })
            return;
        }

        const page = await Page.findById(pageId);
        if(!page){
            res.status(404).json({
                ok: false,
                msg: "Page not found"
            })
            return;
        }

        page.title = title.toString();
        await page.save()

        res.status(200).json({
            ok: true,
            msg: "Successfully changed title",
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error);
        });
    }
}

export const ChangeDescription = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {pageId, description} = req.query;
        if(!description || !description.length){
            res.status(400).json({
                ok: false,
                msg: "Missing title"
            })
            return;
        }

        const page = await Page.findById(pageId);
        if(!page){
            res.status(404).json({
                ok: false,
                msg: "Page not found"
            })
            return;
        }

        page.description = description.toString();
        await page.save()

        res.status(200).json({
            ok: true,
            msg: "Successfully changed description",
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error);
        });
    }
}

export const MakeTemplate = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {pageId} = req.query;

        const page = await Page.findById(pageId);
        if(!page){
            res.status(404).json({
                ok: false,
                msg: "Page not found"
            })
            return;
        }

        page.isTemplate = true;
        await page.save()
        res.status(200).json({
            ok: true,
            msg: "Successfully changed to template",
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error);
        });
    }
}

export const JoinPage = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {pageId} = req.query;

        const page = await Page.findById(pageId);
        if(!page){
            res.status(404).json({
                ok: false,
                msg: "Page not found"
            })
            return
        }

        if(page.owner == req.user?._id){
            res.status(400).json({
                ok: false,
                msg: "You are the owner of this page. So you can't join this page as member.",
            })
            return;
        }

        page.members.push(req.user?.id);
        await page.save()

        res.status(200).json({
            ok: true,
            msg: "Successfully joined",
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error);
        });
    }
}

