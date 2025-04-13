import express from "express";
import fs from 'fs/promises'

import {Transporter} from './Transporter'
import {MailOptions} from "./SendVerificationEmail";
import {pseudoRandomBytes} from "node:crypto";

export const SendEmail = async ({email, subject,text,htmlPath,replace,replaceWith}:{email:string|undefined,subject:string,text?:string,htmlPath?:string,replace?:string[], replaceWith?:string[]}):Promise<boolean | string> => {
    try{
        if(!email){
            throw new Error("Email is required");
        }

        let htmlContent:string = ''
        if(htmlPath){
            htmlContent = await fs.readFile(htmlPath, 'utf8')
            if(replace != undefined && replaceWith != undefined){
                if(replaceWith?.length != replace?.length){
                    throw new Error('Replace length should be same as ReplaceWith length.')
                }
                replace?.forEach((item, index)=>{
                    const pattern = new RegExp(`%%${item}%%`, 'g');
                    htmlContent = htmlContent.replace(pattern, replaceWith != undefined ? replaceWith[index] : '');
                })
            }
        }

        const mailOptions:MailOptions = {
            from: process.env.GMAIL_USER as string,
            to: email,
            subject,
            text: text!=undefined?text:'',
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