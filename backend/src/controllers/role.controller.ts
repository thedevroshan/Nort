import express from "express";
import mongoose from "mongoose";

// Models
import {Role} from "../models/role.model";
import {Page} from "../models/page.model";
import {User} from "../models/user.model";

// Utils
import {INTERNAL_SERVER_ERROR} from "../utils/Errors";

export const GetRoles = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {pageId} = req.query;

        const allRoles = await Role.find({pageId})
        res.status(200).json({ok: true,msg:'Fetched All Roles Successfully', data: allRoles});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


export const CreateRole = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {roleName, color, pageId} = req.query;

        const page = await Page.findById(pageId);
        if(!page){
            res.status(404).json({ok: false, msg: "page not found"});
            return;
        }

        if(!roleName){
            res.status(400).json({ok:false, msg: "roleName required"});
            return;
        }

        await Role.create({
            pageId: page.id,
            roleName,
            color: color?color:'#ffffff',
        })

        res.status(201).json({ok:true, msg:"Role created"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


export const AssignRole = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {roleId, memberId} = req.query;

        if(!roleId || !memberId){
            res.status(400).json({ok: false, msg: "roleId and memberId required"});
            return;
        }

        const role = await Role.findById(roleId);
        if(!role){
            res.status(404).json({ok: false, msg: "role not found"});
            return;
        }

        const user = await User.findById(memberId);
        if(!user){
            res.status(404).json({ok: false, msg: "user not found"});
            return;
        }

        const page = await Page.findById(role.pageId);
        if(!page){
            res.status(404).json({ok: false, msg: "page not found"});
            return;
        }

        if(!page.members.includes(user.id)){
            res.status(404).json({ok: false, msg: "User does not exist in this page."});
            return;
        }

        if(role.assignedTo.includes(user.id)){
            res.status(400).json({ok:false, msg: "Already exists"});
            return;
        }

        role.assignedTo.push(user.id)
        await role.save()

        res.status(200).json({ok:true, msg:"Member has been assigned"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


export const UnassignRole = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {roleId, memberId} = req.query;

        if(!roleId || !memberId){
            res.status(400).json({ok: false, msg: "roleId and memberId required"});
            return;
        }

        const role = await Role.findById(roleId);
        if(!role){
            res.status(404).json({ok: false, msg: "role not found"});
            return;
        }

        const user = await User.findById(memberId);
        if(!user){
            res.status(404).json({ok: false, msg: "user not found"});
            return;
        }

        if(!role.assignedTo.includes(user.id)){
            res.status(400).json({ok:false, msg: "Didn't exists in this role"});
            return;
        }

        role.assignedTo = role.assignedTo.filter(member =>
            member.toString() != memberId
        )
        await role.save()

        res.status(200).json({ok:true, msg:"Member has been unassigned"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


export const EditRole = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {roleId, roleName,color} = req.query;
        if(!roleId || !roleName){
            res.status(400).json({ok: false, msg: "roleId and roleName are required"});
            return;
        }

        const role = await Role.findById(roleId);
        if(!role){
            res.status(404).json({ok: false, msg: "Role not found"});
            return;
        }

        role.roleName = roleName as string;
        if(color){
            role.color = color as string;
        }
        await role.save()

        res.status(200).json({ok:true, msg:"Role updated"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


export const DeleteRole = async (req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {roleId} = req.query;
        if(!roleId){
            res.status(400).json({ok: false, msg: "roleId is required"});
            return;
        }

        const isDelete = await Role.findByIdAndDelete(roleId);
        if(!isDelete){
            res.status(404).json({ok: false, msg: "Unable to delete role."});
            return;
        }

        res.status(200).json({ok:true, msg:"Role deleted successfully"});
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}