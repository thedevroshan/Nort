// Dependencies
import {Request, Response} from "express";
import {validationResult} from 'express-validator'
import bcryptjs from 'bcryptjs'
import path from 'path'

// Models
import {User} from "../models/user.model";

// Utils
import {INTERNAL_SERVER_ERROR} from "../utils/Errors";
import {MailOptions, SendVerificatioEmail} from "../utils/SendVerificationEmail";
import {VerifyJWT, JwtPayload, GenerateJwt} from "../utils/JWT";
import {EncryptPassword} from "../utils/EncryptPassword";

export const Register = async (req: Request, res: Response):Promise<void> => {
    try {
        const {name, username, email, password} = req.body;
        const result = validationResult(req)

        if(!result.isEmpty()){
            res.status(400).json({
                ok: false,
                msg: result.array()
            })
            return;
        }

        const isUsernameExists = await User.findOne({username})
        const isEmailExists = await User.findOne({email})
        if(isUsernameExists) {
            res.status(400).json({
                ok: false,
                msg: "Username already exists"
            })
            return;
        }
        if(isEmailExists){
            res.status(400).json({
                ok: false,
                msg: "Email already exists"
            })
            return;
        }

        const hashedPassword:string | null = await EncryptPassword(password);
        if(hashedPassword == null){
            res.status(500).json({
                ok: false,
                msg:    "INTERNAL SERVER ERROR"
            })
            return;
        }

        await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        })

        await SendVerificatioEmail({email, htmlPath: path.join(__dirname, '../views/email.html')})

        res.status(201).json({
            ok: true,
            msg: "User created successfully",
        })
    }
    catch (error) {
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const EmailVerification = async (req: Request, res: Response):Promise<void> => {
    try {
        const {token} = req.params

        const decoded:JwtPayload | null = VerifyJWT(token)

        if(decoded == null){
            res.status(400).json({
                ok:false,
                msg: "Invalid token or Expired"
            })
            return;
        }

        const isUserExists = await User.findOne({email: decoded.email})
        if(!isUserExists){
            res.status(400).json({
                ok: false,
                msg: 'User not found'
            })
            return;
        }

        if(isUserExists.verified){
            res.status(400).json({
                ok: false,
                msg: 'Already Verified.'
            })
            return;
        }

        await User.updateOne({_id: isUserExists.id},{$set: {verified: true}})

        res.sendFile(path.join(__dirname, '../views/verified.html'))
    }
    catch (error) {
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const Login =  async(req: Request, res: Response):Promise<void> => {
    try{
        const {email_or_username, password} = req.query;
        if(!email_or_username || !password){
            res.status(400).json({
                ok: false,
                msg: "Email or username and password required."
            })
            return;
        }

        const user = await User.findOne({email: email_or_username}) || await User.findOne({username: email_or_username})

        if(!user){
            res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
            return;
        }

        if(!user.verified){
            await SendVerificatioEmail({email: user.email, htmlPath: path.join(__dirname, '../views/email.html')})

            res.status(400).json({
                ok: false,
                msg: 'User verification failed. Verify your email. We have sent a email for verification.'
            })
        }

        const isPassword:boolean = await bcryptjs.compare(password.toString(), user.password)
        if(!isPassword){
            res.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            })
            return;
        }

        const token:string|null = GenerateJwt({userId: user.id},{expiresIn: '28d'})
        if(token == null){
            res.status(400).json({
                ok: false,
                msg: 'Something went wrong'
            })
            return;
        }
        res.cookie('token', token,{
            httpOnly: true,
            secure: true,
        }).json({ok:true, msg:'Logged in', token})
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

export const Logout = async(req: Request, res: Response):Promise<void> => {
    try{
        res.cookie('token', null, {
            httpOnly: true,
            secure: true,
        }).json({
            ok: true,
            msg: 'Logged out',
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}