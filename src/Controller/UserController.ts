// Controller/UserController.ts

import { Request, Response, NextFunction } from 'express'

export class UserController
{
    // GET users/:id
    static UserInfo(req: Request, res: Response,next:NextFunction)
    {
        let user = req.params;
        console.log("receive a GET request");
        console.log('[', req.method, '][', req.originalUrl, ']');
        console.log(req.params);
        
        
        
        return res.json(req.params).end();
    }

    


}