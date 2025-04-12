import express from "express";
import fs from 'fs/promises'

import {Transporter} from './Transporter'
import {MailOptions} from "./SendVerificationEmail";

export const SendEmail = async (email:string|undefined,subject:string,text:string,htmlPath?:string):Promise<boolean> => {
    try{
        if(!email){
            return false
        }

        let htmlContent:string = ''
        if(htmlPath){
            htmlContent = await fs.readFile(htmlPath, 'utf8')
        }

        const mailOptions:MailOptions = {
            from: process.env.GMAIL_USER as string,
            to: email,
            subject,
            text,
            html: htmlContent
        }

        const isSent = await Transporter.sendMail(mailOptions)
        if(!isSent){
            return false
        }
        return true
    }
    catch (error){
        if(process.env.NODE_ENV === 'development'){
            console.log(error)
            return false
        }
        return false
    }
}