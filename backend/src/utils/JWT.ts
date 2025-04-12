import jwt, {SignOptions} from 'jsonwebtoken'
import e from "express";

export interface JwtPayload {
    email?: string,
    userId?: string,
}

export const GenerateJwt = (payload:JwtPayload, {expiresIn}:{expiresIn: any}):null | string => {
    try{
        const secret:string | undefined = process.env.JWT_SECRET;
        if(secret == undefined){
            throw new Error('JWT secret not set')
        }
        return jwt.sign(payload, secret, {algorithm: 'HS512', expiresIn},);
    }
    catch(error){
        if(process.env.NODE_ENV === 'development'){
            console.log('Error generating JWT: ', error)
            return null
        }
        return null
    }
}

export const VerifyJWT = (token: string):JwtPayload | null => {
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
        return decodedToken as JwtPayload
    }
    catch (error) {
        if(process.env.NODE_ENV === 'development'){
            console.error('Error verifying token:', error);
            return null;
        }
        return null;
    }
}
