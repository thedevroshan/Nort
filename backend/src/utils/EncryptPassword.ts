import bcryptjs from "bcryptjs";

export const EncryptPassword = async (password:string):Promise<string | null> => {
    try{
        const saltLength:string|undefined = process.env.SALT_LENGTH as string;
        if(saltLength == undefined){
            return null;
        }
        const salt:string = await bcryptjs.genSalt(parseInt(saltLength));
        const hashedPassword:string = await bcryptjs.hash(password, salt);
        return hashedPassword;
    }
    catch (error){
        if(process.env.NODE_ENV === 'development'){
            console.log(error);
            return null
        }
        return null
    }
}