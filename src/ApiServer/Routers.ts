/*
 * @Author: your name
 * @Date: 2020-05-22 13:42:30
 * @LastEditTime: 2020-07-21 23:59:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \api-framework-express\src\ApiServer\Routers.ts
 */

// ApiServer/Routers.ts

import express from 'express';
import { UserController } from '../Controller/UserController';
import { BookController } from '../Controller/BookController';

export class Routers {
    apiRouter = express.Router();

    PathRouter() {
        // api/users/
        this.apiRouter.get('/users/:id', UserController.UserInfo);

        // api/books/
        this.apiRouter.get('/books/all', BookController.GetAllBooks);

        // api/orders/
        //this.apiRouter.use('/orders')
    }
}
