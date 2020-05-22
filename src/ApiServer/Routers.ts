// ApiServer/Routers.ts

import express from "express";
import { UserController } from "../Controller/UserController";
import { BookController } from "../Controller/BookController";

export class Routers
{
    apiRouter = express.Router();

    PathRouter()
    {
        
        // api/users/
        this.apiRouter.get('/users/:id', UserController.UserInfo);


        // api/books/
        this.apiRouter.get('/books/all',BookController.GetAllBooks)


        // api/orders/
        //this.apiRouter.use('/orders')
    }

}