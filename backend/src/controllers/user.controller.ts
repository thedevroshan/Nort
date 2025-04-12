import express from "express"
import path from 'path'
import bcryptjs from "bcryptjs";

// Models
import {User} from "../models/user.model";


// Utils
import {INTERNAL_SERVER_ERROR} from "../utils/Errors";
import {OTPGenerator, ValidateOTP, IValidatedOTP} from "../utils/OTP";
import {SendEmail} from "../utils/SendEmail";
import {validationResult} from "express-validator";
import {SendVerificatioEmail} from "../utils/SendVerificationEmail";
import {EncryptPassword} from "../utils/EncryptPassword";

export const GetUserInfo = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        res.json(req.user)
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ChangeName = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {name} = req.query
        if(!name){
            res.status(400).json({
                ok: false,
                msg: "Missing name"
            })
            return;
        }

        await User.updateOne({_id: req?.user?.id}, {$set: {name}},{new: true})
        res.status(200).json({ok: true, msg:"Successfully Updated"})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ChangeUsername = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {username} = req.query
        if(!username){
            res.status(400).json({ok: false, msg: "Missing username"})
            return;
        }
        const isUsrnameAvailable =await User.findOne({username})
        if(isUsrnameAvailable){
            res.status(200).json({ok: false, msg:"Username is already in use"})
            return;
        }

        await User.updateOne({_id: req?.user?._id}, {$set: {username}}, {new: true})
        res.status(200).json({ok: true, msg:"Successfully Updated"})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ChangeEmailRequest = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        const expirationTime =  process.env.OTP_EXPIRATION
        if(!expirationTime){
            res.status(500).json({ok: false, msg: "INTERNAL SERVER ERROR"})
            return;
        }

        const otp:string = await OTPGenerator(6, 3, req?.user?.id, parseInt(expirationTime))
        await SendEmail(req?.user?.email, 'Change Email', `Here, is your OTP to change your email. Note: This OTP will be expired in 2 minute\n${otp}`)
        res.status(200).json({ok: true, msg:"Email Sent!!"})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ChangeEmail = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {email,otp} = req.body
        const result =validationResult(req)
        if(!result.isEmpty()){
            res.status(400).json({ok: false, msg:result.array()})
            return;
        }

        if(!email || !otp){
            res.status(400).json({ok: false, msg: "Email and OTP are required."})
            return
        }

        const validateOTP:IValidatedOTP | null = await ValidateOTP(otp)
        if(validateOTP == null){
            res.status(400).json({ok: false, msg: "Unable to validate OTP"})
            return
        }

        if(!validateOTP.ok){
            res.status(400).json({ok: false, msg:validateOTP.msg})
            return
        }

        await User.findByIdAndUpdate({_id: req?.user?._id}, {$set: {email, verified: false}}, {new: true})
        await SendVerificatioEmail({email, htmlPath: path.join(__dirname, '../public/email.html')})

        res.status(200).json({ok: true, msg:"Successfully Updated"})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const ChangePassword = async(req: express.Request, res: express.Response):Promise<void> => {
    try{
        const {currentPassword, password} = req.body
        const result =validationResult(req)
        if(!result.isEmpty()){
            res.status(400).json({ok: false, msg:result.array()})
            return;
        }

        const user = await User.findById(req?.user?._id)
        if(!user){
            res.status(404).json({ok: false, msg:"User not found."})
            return
        }

        const isCurretPassword:boolean = await bcryptjs.compare(currentPassword, user.password)
        if(!isCurretPassword){
            res.status(400).json({ok: false, msg:"Incorrect current password."})
            return;
        }

        const hashedPassword:string | null = await EncryptPassword(password)
        if(hashedPassword == null){
            res.status(500).json({ok: false, msg:"INTERNAL SERVER ERROR"})
            return;
        }

        await User.updateOne({_id: req?.user?._id}, {$set: {password: hashedPassword}}).exec()

        res.status(200).json({ok: true, msg:"Successfully Updated"})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}