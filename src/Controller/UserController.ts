// Controller/UserController.ts

import { Request, Response, NextFunction } from 'express';
import { db } from '../lib/common/DBManager.knex';

export class UserController {
    // GET users/:id
    static async UserInfo(req: Request, res: Response, next: NextFunction) {
        const user = req.params;
        console.log('receive a GET request');
        console.log('[', req.method, '][', req.originalUrl, ']');

        console.log(req.cookies);
        //res.cookie("name", "zzb", { maxAge: 9000000 })
        //res.clearCookie("name");
        //req.session.userinfo = "zzb";

        console.log(req.headers);

        console.log(req.session);

        return res.json({ id: req.params.id }).end();

        //let userinfo = await db.sqldb.select().from("player").where("id", "=", req.params.id);
        //console.log(userinfo);

        try {
            const userinfo = await db.sqldb.select().from('player').where('id', '=', req.params.id);
            console.log(userinfo);
            return res.json(userinfo).end();
        } catch (error) {
            console.error(error);
            return res.status(404).end();
        }
    }
}
