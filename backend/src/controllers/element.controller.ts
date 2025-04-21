import express from 'express';

// Models
import {
    EListBasedElement,
    EMediaBasedElement,
    EURLBasedElement,
    ETextBasedElement,
    EElementValues,
    TextBasedElementValues,
    URLBasedElementValues,
    MediaBasedElementValues,
    ListBasedElementValues,
    Element
} from "../models/elements.model";

// Utils
import {INTERNAL_SERVER_ERROR} from "../utils/Errors";

export const AddElement = async(req: express.Request, res: express.Response) => {
    try{
        const {elementType, pageId} = req.query;

        if(!pageId || !elementType){
            res.status(400).json({ok: false, msg:"pageId and elementType query are required."});
            return;
        }

        if(!TextBasedElementValues.includes(elementType.toString()) && !MediaBasedElementValues.includes(elementType.toString()) && !URLBasedElementValues.includes(elementType.toString()) && !ListBasedElementValues.includes(elementType.toString())){
            res.status(400).json({
                ok: false,
                msg: "Element type is not valid."
            })
            return;
        }

        const isAdded = await Element.create({
            elementType,
            pageId,
        })

        if(!isAdded){
            res.status(400).json({
                ok: false,
                msg: "Something went wrong",
            })
            return;
        }

        res.status(200).json({
            ok: true,
            msg: "Element added successfully.",
            data: isAdded
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const UpdateTextBasedElement = async(req: express.Request, res: express.Response) => {
    try{
        for(const newContents of req.body){
            const element = await Element.findById(newContents._id);
            if(!element){
                res.status(404).json({ok: false, msg:"Element not found"});
                return;
            }

            if(!TextBasedElementValues.includes(element.elementType)){
                res.status(400).json({ok: false, msg:"This element doesn't have TextBasedElementValues."});
                return;
            }

            element.text = newContents.text;
            const isUpdated = await element.save()
            if(!isUpdated){
                res.status(400).json({ok: false, msg:"Unable to Update TextBasedElementValues."});
                return;
            }
        }

        res.status(200).json({ok: true, msg:"Element updated"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const UpdateMediaBasedElement = async(req: express.Request, res: express.Response) => {
    try{
        for(const newContents of req.body){
            const element = await Element.findById(newContents._id);
            if(!element){
                res.status(404).json({ok: false, msg:"Element not found"});
                return;
            }

            if(!MediaBasedElementValues.includes(element.elementType)){
                res.status(400).json({ok: false, msg:"This element doesn't have MediaBasedElementValues."});
                return;
            }

            element.media = newContents.media;
            const isUpdated = await element.save()
            if(!isUpdated){
                res.status(400).json({ok: false, msg:"Unable to Update MediaBasedElementValues."});
                return;
            }
        }

        res.status(200).json({ok: true, msg:"Element updated"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const UpdateURLBasedElement = async(req: express.Request, res: express.Response) => {
    try{
        for(const newContents of req.body){
            const element = await Element.findById(newContents._id);
            if(!element){
                res.status(404).json({ok: false, msg:"Element not found"});
                return;
            }

            if(!MediaBasedElementValues.includes(element.elementType)){
                res.status(400).json({ok: false, msg:"This element doesn't have MediaBasedElementValues."});
                return;
            }

            element.media = newContents.media;
            const isUpdated = await element.save()
            if(!isUpdated){
                res.status(400).json({ok: false, msg:"Unable to Update MediaBasedElementValues."});
                return;
            }
        }

        res.status(200).json({ok: true, msg:"Element updated"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const UpdateListBasedElement = async(req: express.Request, res: express.Response) => {
    try{
        for(const newContents of req.body){
            const element = await Element.findById(newContents._id);
            if(!element){
                res.status(404).json({ok: false, msg:"Element not found"});
                return;
            }

            if(!ListBasedElementValues.includes(element.elementType)){
                res.status(400).json({ok: false, msg:"This element doesn't have ListBasedElementValues."});
                return;
            }

            element.list = newContents.list;
            const isUpdated = await element.save()
            if(!isUpdated){
                res.status(400).json({ok: false, msg:"Unable to Update ListBasedElementValues."});
                return;
            }
        }

        res.status(200).json({ok: true, msg:"Element updated"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const TextBasedTurnInto = async(req: express.Request, res: express.Response) => {
    try{
        const element = await Element.findById(req.body?._id)
        if(!element){
            res.status(404).json({ok: false, msg:"Element not found"});
            return;
        }

        if(!req.query.turnInto || !TextBasedElementValues.includes(req.query?.turnInto.toString())){
            res.status(400).json({
                ok: false,
                msg: "turnInto is missing in query or invalid type given."
            })
            return;
        }

        let newText:string = req.body?.listName + "\n"

        req.body?.list.forEach((text:string) =>{
            newText = newText + text + "\n"
        })

        element.elementType = req.query.turnInto.toString();
        element.text = newText;
        element.listName = ''
        element.list = []
        await element.save()

        res.status(200).json({ok: true, msg:"Element turned into text."});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ListBasedTurnInto = async(req: express.Request, res: express.Response) => {
    try{
        const element = await Element.findById(req.body?._id)
        if(!element){
            res.status(404).json({ok: false, msg:"Element not found"});
            return;
        }

        if(!req.query.turnInto || !ListBasedElementValues.includes(req.query?.turnInto.toString())){
            res.status(400).json({
                ok: false,
                msg: "turnInto is missing in query or invalid type given."
            })
            return;
        }


        element.elementType = req.query.turnInto.toString();
        element.listName = req.body?.text
        element.text = ''
        await element.save()

        res.status(200).json({ok: true, msg:"Element turned into list."});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}