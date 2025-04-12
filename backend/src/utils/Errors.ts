import {Response} from "express";

export const INTERNAL_SERVER_ERROR = (res: Response, inDevEnv:()=>void)=>{
    if(process.env.NODE_ENV as string === "development"){
        inDevEnv();
        return;
    }
    res.status(500).send("Internal server error");
};

export const EXPIRED = (res: Response, inDevEnv:()=>void) => {
    if(process.env.NODE_ENV as string === "development"){
        inDevEnv();
        return;
    }
    res.status(404).json({
        ok: false,
        msg: "Expired"
    })
}