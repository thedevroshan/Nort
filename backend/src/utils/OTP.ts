import {OTP} from "../models/otp.model";

export interface IValidatedOTP {
    ok: boolean;
    msg: string;
    userId: string | null;
}


export const OTPGenerator = async (blockLength:number, numberOfBlocks:number, userId:string, expirationInMinute:number):Promise<string> =>{
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let block:string = ''
    let code:string = ''

    for (let i:number = 0; i < numberOfBlocks; i++) {
        for(let j:number = 0;j < blockLength; j++) {
            block += '' + letters[Math.floor(Math.random() * letters.length)]
        }
        code += (i == (numberOfBlocks - 1)?block:block+" ")
        block = ''
    }

    await OTP.create({
        otp: code,
        userId,
        expiration: (expirationInMinute * 60 * 1000) + Date.now(),
    })

    return code
}

export const ValidateOTP = async (otp:string):Promise<null | IValidatedOTP> => {
    try{
        const isOTP = await OTP.findOne({otp})

        if(!isOTP){
            return {
                ok: false,
                msg: "OTP does not exist.",
                userId: null
            }
        }

        if(isOTP.expiration < Date.now()){
            await OTP.deleteOne({_id: isOTP._id})
            return {
                ok: false,
                msg: "OTP expired",
                userId: null
            }
        }

        await OTP.deleteOne({_id: isOTP._id})
        return {
            ok: true,
            msg: "Validated.",
            userId: isOTP.userId as string
        }
    }
    catch (error){
        if(process.env.NODE_ENV === 'development'){
            console.log(error)
            return null
        }
        return null
    }
}